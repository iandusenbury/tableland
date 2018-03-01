module Api::V1
  class UsersController < ApiBaseController
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /v1/users
    def index
      @users = User.all
      render json: @users, include: 'media', status: :ok
    end

    # GET /v1/users/current/permissions
    def permissions
      # Make checks on current_user role
      render json: current_user, serializer: PermissionsSerializer, status: :ok
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
      # Check for errors/failures
      @user = User.where(visible: true).limit(1).order("RANDOM()").first
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
      if @user.update(user_params)
        render json: @user, include: '', status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /v1/users/{id}
    def destroy
      @user.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def user_params
        params.require(:user).permit(:first_name, :last_name, :description, :linkedin_id, :contact_url)
      end
  end
end
