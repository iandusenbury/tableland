module Api::V1
  class ProgramsController < ApiBaseController
    before_action :set_organization, only: :create
    before_action :set_program, only: [:show, :update, :grant_permission, :admins]
    before_action :allow_if_visible, except: [:index, :show]

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
      if @program.update(update_program_params)
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

      def set_program
        @program = Program.find(params[:id])
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

      # Permit only the appropriate parameters for the creation of a new program
      def create_program_params
        params.require(:program).permit(:name)
      end

      # Permit only the appropriate parameters for the update of an existing program
      def update_program_params
        params.require(:program).permit(:name, :description, :url, :visible)
      end

      def admin_params
        params.require(:admin).permit(:user_id)
      end
  end
end
