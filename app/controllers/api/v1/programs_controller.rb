module Api::V1
  class ProgramsController < ApiBaseController
    before_action :set_organization, only: :create
    before_action :set_program, only: [:show, :update, :grant_permission, :admins]

    # GET /v1/programs
    def index
      @programs = Program.all
      render json: @programs, include: 'media', status: :ok
    end

    # GET /v1/programs/{id}
    def show
      render json: @program, include: 'media,users.media,sponsors.media', status: :ok
    end

    # POST /v1/organizations/{organization_id}/programs
    def create
      @program = @organization.programs.new(program_params)
      # @program = Program.new(program_params)

      if @organization.save
        render json: @program, include: '', status: :created
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /v1/programs/{id}
    def update
      if @program.update(program_params)
        render json: @program, include: '', status: :ok
      else
        render json: @program.errors, status: :unprocessable_entity
      end
    end

    # POST /v1/programs/{id}/permissions
    def grant_permission
      @permission = @program.permissions.new(admin_params)
      if @program.save
        render json: @program, include: 'admins', status: :created
      else
        render json: @program.errors, status: :unprocessable_entity
      end
    end

    # GET /v1/programs/{id}/admins
    def admins
      render json: @program, include: 'admins', status: :ok
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

      # Use callbacks to share common setup or constraints between actions.
      def set_program
        @program = Program.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def program_params
        params.require(:program).permit(:name, :description, :url, :visible)
      end

      def admin_params
        params.require(:admin).permit(:user_id)
      end
  end
end
