module Api::V1
  class ExperiencesController < ApiBaseController
    before_action :set_experience, only: [:show, :update, :destroy]

    # GET /experiences
    # GET /experiences.json
    def index
      @experiences = Experience.all
      render json: @experiences, status: :ok
    end

    # GET /experiences/1
    # GET /experiences/1.json
    def show
      render json: @experience, status: :ok
    end

    # POST /experiences
    # POST /experiences.json
    def create
      @experience = Experience.new(experience_params)

      if @experience.save
        render json: @experience, status: :created
      else
        render json: @experience.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /experiences/1
    # PATCH/PUT /experiences/1.json
    def update
      if @experience.update(experience_params)
        render json: @experience, status: :ok
      else
        render json: @experience.errors, status: :unprocessable_entity
      end
    end

    # DELETE /experiences/1
    # DELETE /experiences/1.json
    def destroy
      @experience.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_experience
        @experience = Experience.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def experience_params
        params.require(:experience).permit(:user_id, :organization_id, :program_id, :start_date, :end_date, :title, :award)
      end
  end
end
