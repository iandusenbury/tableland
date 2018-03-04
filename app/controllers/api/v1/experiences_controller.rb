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
        
        if !program_id && !organization_id
          raise ExceptionTypes::BadRequestError.new("An experience must be associated with either a program or an organization")
        end
        if organization_id
          Organization.find(organization_id)
        elsif program_id
          program = Program.find(program_id)
          if parent_org_id
            parent_organization = Organization.find(parent_org_id)
            if !program.sponsors.exists?(organization_id: parent_organization.id)
              raise ExceptionTypes::BadRequestError.new("Specified parent organization with ID: #{parent_org_id}, must be a parent of the specified program with ID: #{program_id}")
            end
          end
        end
      end

      # Validate that the dates in the payload are correctly formatted and chronological
      def validate_dates
        start_date = params[:start_date] || params[:experience][:start_date]
        end_date = params[:end_date] || params[:experience][:end_date]

        if start_date && end_date
          start_date = parse_datetime("start_date", start_date)
          end_date = parse_datetime("end_date", end_date)
          check_chronological(start_date, end_date)
        elsif start_date
          start_date = parse_datetime("start_date", start_date)
          if @experience && @experience.end_date
            check_chronological(start_date, @experience.end_date)
          end
        elsif end_date
          end_date = parse_datetime("end_date", end_date)
          if @experience
            check_chronological(@experience.start_date, end_date)
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

      # Attempt to convert string param into DateTime object, raise BadRequestError if unsuccessful
      def parse_datetime(param_name, datetime_to_parse)
        begin
          datetime_to_parse = DateTime.parse(datetime_to_parse)
        rescue ArgumentError
            raise ExceptionTypes::BadRequestError.new("Invalid datetime format for #{param_name}: #{datetime_to_parse}")
        end
        datetime_to_parse
      end

      # Validate that the start_date for an experience comes before the end_date for an experience
      def check_chronological(comes_before, comes_after)
        if comes_after < comes_before
          raise ExceptionTypes::BadRequestError.new("end_date: #{comes_after}, must not be before start_date: #{comes_before}")
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
