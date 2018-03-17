module Api::V1
  class ProgramsController < ApiBaseController
    before_action :set_organization, only: :create
    before_action :set_program, only: [:show, :update, :grant_permission, :admins, :revoke_permission]
    before_action :allow_if_visible, except: [:index, :show]
    before_action :require_correct_admin, only: [:update, :grant_permission, :admins, :revoke_permission]
    before_action :find_user, only: :revoke_permission
    before_action :validate_update_params, only: :update
    before_action :check_index_permission, only: :index

    # GET /v1/programs
    def index
      @programs = Program.all
      render json: @programs, include: '', status: :ok
    end

    # GET /v1/programs/{id}
    def show
      render json: @program, include: 'media,users.media,sponsors.media', status: :ok
    end

    # POST /v1/organizations/{organization_id}/programs
    def create
      @program = Program.new(create_program_params)
      @program = verify_and_save_program(@program)
      render json: @program, include: '', status: :created
    end

    # PATCH/PUT /v1/programs/{id}
    def update
      @program.update!(update_program_params)
      render json: @program, include: '', status: :ok
    end

    # POST /v1/programs/{id}/permissions
    def grant_permission
      new_admin = validate_grant_params
      @program.permissions.new(user_id: new_admin.id)
      @program.save!
      render json: new_admin, include: '', status: :created
    end

    # GET /v1/programs/{id}/admins
    def admins
      render json: @program, include: 'admins', status: :ok
    end

    # DELETE /v1/programs/{id}/revoke
    def revoke_permission
      permissions_to_destroy = find_permissions_to_revoke(@program, @user)
      permissions_to_destroy.destroy_all
      consider_demotion(@user)
      render json: @user, include: '', status: :ok
    end

    # Unreachable
    # DELETE /programs/1
    # DELETE /programs/1.json
    def destroy
      @program.destroy
    end

    private
      def set_organization
        @organization = Organization.find(params[:organization_id])
      end

      def set_program
        @program = Program.find(params[:id])
      end

      # Restrict certain actions to only admins with permission for the specified program
      def require_correct_admin
        if current_user.user?
          raise ExceptionTypes::UnauthorizedError.new("Admin access only")
        end
        if current_user.admin?
          raise ExceptionTypes::UnauthorizedError.new("You do not have permission to modify the program with ID #{@program.id}") unless @program.admins.exists? current_user.id
        end
      end

      # Find the specified user when preparing to revoke their permission 
      def find_user
        raise ExceptionTypes::BadRequestError.new("user_id must be present") unless params[:user_id].present?
        
        @user = User.find(params[:user_id])
      end

      # Validate the request payload when updating an existing program
      def validate_update_params
        validate_url
        validate_visible
      end

      # Ensure that only super admins can view all programs
      def check_index_permission
        raise ExceptionTypes::UnauthorizedError.new("You do not have permission to view all programs") unless current_user.super_admin?
      end

      # Verify that the newly created program is valid and if it is, check to
      # see if it matches an existing program at the same organization that 
      # should be used instead. Otherwise, save the new program and connect
      # it to the specified parent organization.
      def verify_and_save_program(program_to_verify_and_save)
        duplicate_program = find_duplicate(program_to_verify_and_save) if program_to_verify_and_save.valid?
        return duplicate_program if duplicate_program.present?
        
        program_to_verify_and_save.save!
        @organization.sponsors.create!(program_id: program_to_verify_and_save.id)

        program_to_verify_and_save
      end

      # Attempt to find an existing program with the exact same name or
      # almost the exact same name as the program provided as an argument
      def find_duplicate(valid_new_program)
        new_name = valid_new_program.name

        found_duplicate = @organization
                              .programs
                              .where("LOWER(name) = ?", new_name.downcase)
                              .first

        found_duplicate
      end

      # Validate that the url attribute in the payload does not contain invalid characters or spaces
      # This parse method is very lenient and could be made more strict if we want
      def validate_url
        url = params[:url] || params[:program][:url]
        begin
          URI.parse(url) if url
        rescue URI::InvalidURIError
          raise ExceptionTypes::BadRequestError.new("Invalid characters used in URL: #{url}")
        end
      end

      # Validate that the visible attribute in the payload is strictly
      # boolean true or false
      def validate_visible
        visible = params[:visible] || params[:program][:visible]

        if visible && visible.to_s != "true" && visible.to_s != "false"
          raise ExceptionTypes::BadRequestError.new("Invalid format for visible: #{visible}, must be boolean true or false")
        end
      end

      # Permit only the appropriate parameters for the creation of a new program
      def create_program_params
        params.require(:program).permit(:name)
      end

      # Permit only the appropriate parameters for the update of an existing program
      def update_program_params
        params.require(:program).permit(:name, :description, :url, :visible)
      end

  end
end
