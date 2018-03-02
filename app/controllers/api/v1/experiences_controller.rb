module Api::V1
  class ExperiencesController < ApiBaseController
    before_action :set_user, only: [:create, :update, :destroy]
    before_action :set_experience, only: [:update, :destroy]
    before_action :validate_create_params, only: :create
    before_action :validate_update_params, only: :update

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
      @experience = @user.experiences.new(create_experience_params)
      @experience.save!
      if @experience.current
        update_current_experience
      end
      render json: @experience, status: :created
    end

    # PATCH/PUT /v1/users/{user_id}/experiences/{id}
    def update
      @experience.update!(update_experience_params)
      if @experience.current
        update_current_experience
      end
      render json: @experience, status: :ok
    end

    # DELETE /v1/users/{user_id}/experiences/{id}
    def destroy
      @experience.destroy
    end

    private
      def set_user
        @user = User.find(params[:user_id])

        if @user.id != current_user.id
          raise ExceptionTypes::UnauthorizedError.new("You do not have access to modify the experiences of the user with ID #{@user.id}")
        end
      end

      def set_experience
        @experience = @user.experiences.find(params[:id]) if @user
      end

      # Validate the request payload for creating a new experience
      def validate_create_params
        validate_ids
        validate_dates
        validate_current
      end

      # Validate the request payload for updating an existing experience
      def validate_update_params
        validate_dates
        validate_current
      end

      # Validate that the ids in the payload belong to existing records
      def validate_ids
        organization_id = params[:organization_id] || params[:experience][:organization_id]
        program_id = params[:program_id] || params[:experience][:program_id]
        parent_org_id = params[:parent_org] || params[:experience][:parent_org]
        
        if program_id
          Program.find(program_id)
        end
        if organization_id
          Organization.find(organization_id)
        end
        if parent_org_id
          Organization.find(parent_org_id)
        end
      end

      # Validate that the dates in the payload are correctly formatted and chronological
      def validate_dates
        start_date = params[:start_date] || params[:experience][:start_date]
        end_date = params[:end_date] || params[:experience][:end_date]

        if start_date
          begin
            start_date = DateTime.parse(start_date)
          rescue ArgumentError
            raise ExceptionTypes::BadRequestError.new("Invalid datetime format for start_date: #{start_date}")
          end
        end

        if end_date
          begin
            end_date = DateTime.parse(end_date)
          rescue ArgumentError
            raise ExceptionTypes::BadRequestError.new("Invalid datetime format for end_date: #{end_date}")
          else
            if start_date && end_date < start_date
              raise ExceptionTypes::BadRequestError.new("end_date: #{end_date}, must not be before start_date: #{start_date}")
            end
          end
        end
      end

      # Validate that the current attribute in the payload is strictly boolean true or false
      def validate_current
        current = params[:current] || params[:experience][:current]

        if current && current != true && current != false
          raise ExceptionTypes::BadRequestError.new("Invalid format for current: #{current}, must be boolean true or false")
        end
      end

      # Set the current attribute to false for all experiences except the new current experience
      def update_current_experience
        @user.experiences.where(current: true).where.not(id: @experience.id).update_all(current: false)
      end

      # Permit the appropriate attributes when updating an experience from a request payload
      def update_experience_params
        params.require(:experience).permit(:start_date, :end_date, :title, :award, :current)
      end

      # Permit the appropriate attributes when creating an experience from a request payload
      def create_experience_params
        params.require(:experience).permit(:user_id, :organization_id, :program_id, :start_date, :end_date, :title, :award, :current, :parent_org)
      end

  end
end
