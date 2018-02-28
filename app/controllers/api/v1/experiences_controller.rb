module Api::V1
  class ExperiencesController < ApiBaseController
    before_action :set_user, only: [:create, :update, :destroy]
    before_action :set_experience, only: [:update, :destroy]

    # Unreachable
    # GET /experiences
    # GET /experiences.json
    def index
      @experiences = Experience.all
      render json: @experiences, status: :ok
    end

    # Unreachable
    # GET /experiences/1
    # GET /experiences/1.json
    def show
      render json: @experience, status: :ok
    end

    # POST /v1/users/{user_id}/experiences
    def create
      # Refactor this workflow
      @experience = nil
      if params[:experience][:organization_id] 
        if params[:experience][:program_id]
          # fail here
        else
          # build here
          @experience = @user.experiences.new(organization_experience_params)
        end
      elsif params[:experience][:program_id]
        # build here
        @experience = @user.experiences.new(program_experience_params)
      else
        # fail here
      end
      
      # @experience = Experience.new(experience_params)

      if @user.save
        render json: @experience, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /v1/users/{user_id}/experiences/{id}
    def update
      if @experience.update(organization_experience_params)
        render json: @experience, status: :ok
      else
        render json: @experience.errors, status: :unprocessable_entity
      end
    end

    # DELETE /v1/users/{user_id}/experiences/{id}
    def destroy
      @experience.destroy
    end

    private
      def set_user
        @user = User.find(params[:user_id])
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_experience
        @experience = @user.experiences.find(params[:id]) if @user
      end

      # Refactor these to be one method that takes a parameter for appropriate ID
      def organization_experience_params
        params.require(:experience).permit(:user_id, :organization_id, :start_date, :end_date, :title, :award, :current)
      end

      def program_experience_params
        params.require(:experience).permit(:user_id, :program_id, :start_date, :end_date, :title, :award, :current)
      end

  end
end
