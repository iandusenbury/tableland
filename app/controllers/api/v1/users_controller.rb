module Api::V1
  class UsersController < ApiBaseController
    before_action :set_user, only: [:permissions, :show, :update, :destroy]
    before_action :validate_index, only: :index
    before_action :validate_permissions, only: :permissions
    before_action :validate_destroy, if: -> { @user.id != current_user.id }, only: :destroy

    # GET /v1/users
    def index
      @users = index_query || User.all
      render json: @users, include: '', status: :ok
    end

    # GET /v1/users/{id}/permissions
    def permissions
      render json: @user, serializer: PermissionsSerializer, status: :ok
    end

    # GET /v1/users/{id}
    def show
      render json: @user, include: 'media,experiences.program.media,experiences.organization.media', status: :ok
    end

    # GET /v1/users/current
    def current
      render json: current_user, include: 'media,experiences.program.media,experiences.organization.media', status: :ok
    end

    # GET /v1/users/random
    def random
      @user = User.where(visible: true).limit(1).order("RANDOM()").first
      @user ||= { user: {} }
      render json: @user, include: 'media,experiences.program.media,experiences.organization.media', status: :ok
    end

    # Unreachable
    # POST /users
    # POST /users.json
    def create
      @user = User.new(user_params)

      if @user.save
        render json: @user, include: 'media', status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /v1/users/{id}
    def update
      update_params = validate_update_params
      @user.update!(send(update_params))
      render json: @user, include: '', status: :ok
    end

    # DELETE /v1/users/{id}
    def destroy
      @user.destroy
    end

    private
      def set_user
        @user = User.find(params[:id])
      end

      # For the index action, assert super_admin access only
      def validate_index
        raise ExceptionTypes::UnauthorizedError.new("You do not have permission to view all users") unless current_user.super_admin?
      end

      # For the permissions action, assert admin access only and only allow the super
      # admin to view the permissions of anyone other than themselves.
      def validate_permissions
        raise ExceptionTypes::UnauthorizedError.new("Admin access only") if current_user.user?
        raise ExceptionTypes::UnauthorizedError.new("You are not authorized to view the permissions of the user with ID #{@user.id}") if @user.id != current_user.id && current_user.admin?
      end

      # For the destroy acton, only allow super admins to delete a user other than themselves.
      def validate_destroy
        raise ExceptionTypes::UnauthorizedError.new("You do not have permission to delete the user with ID #{@user.id}") unless current_user.super_admin?
      end

      # Execute the appropriate query for the index action based on the query params and return the result
      def index_query
        users = nil
        role = validate_role([:user, :admin, :super_admin])
        visible = validate_visible

        if role && visible
          users = User.where(role: role, visible: (visible == "true"))
        elsif role
          users = User.where(role: role)
        elsif visible
          users = User.where(visible: (visible == "true"))
        end

        users
      end

      # Validate the request payload for updating an existing user
      def validate_update_params
        params_filter = nil

        if @user.id != current_user.id
          params_filter = validate_id_mismatch
        else
          params_filter = validate_id_match
        end

        params_filter ||= :user_params
      end

      # If the update is for a user that does not match the current user,
      # determine if permission should be granted for the update
      def validate_id_mismatch
        if current_user.super_admin?
          validate_role([:user, :admin, :super_admin])
          validate_visible
          return :super_admin_params
        else
          raise ExceptionTypes::UnauthorizedError.new("You do not have permission to modify the attributes of the user with ID #{@user.id}")
        end
      end

      # If the update is for a user that does match the current user,
      # determine which params should be permitted.
      def validate_id_match
        if current_user.admin?
          validate_role([:user, :admin])
          return :admin_params
        end
        if current_user.super_admin?
          validate_visible
          return :super_admin_self_params
        end
      end

      # Validate that the role attribute in the payload matches one of
      # the options in the argument array
      def validate_role(options)
        role = params[:role] || (params[:user] && params[:user][:role])

        if role        
          raise ExceptionTypes::BadRequestError.new("You must set role to one of the following: #{options.join(", ")}") unless options.include? role.to_sym
        end

        role
      end

      # Validate that the visible attribute in the payload is strictly
      # boolean true or false
      def validate_visible
        visible = params[:visible] || (params[:user] && params[:user][:visible])

        if visible && visible.to_s != "true" && visible.to_s != "false"
          raise ExceptionTypes::BadRequestError.new("Invalid format for visible: #{visible}, must be boolean true or false")
        end

        visible
      end

      # Permit the appropriate attributes when updating a user with role user
      def user_params
        params.require(:user).permit(:first_name, :last_name, :description)
      end

      # Permit the appropriate attributes when updating a user with role admin
      def admin_params
        params.require(:user).permit(:first_name, :last_name, :description, :role)
      end

      # Permit the appropriate attributes when a super_admin is updating themselves
      def super_admin_self_params
        params.require(:user).permit(:first_name, :last_name, :description, :visible)
      end

      # Permit the appropriate attributes when a super_admin is updating others
      def super_admin_params
        params.require(:user).permit(:first_name, :last_name, :description, :role, :visible)
      end

  end
end
