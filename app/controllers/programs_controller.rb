class ProgramsController < ApplicationController
  before_action :set_program, only: [:show, :update, :destroy]

  # GET /programs
  # GET /programs.json
  def index
    @programs = Program.all
  end

  # GET /programs/1
  # GET /programs/1.json
  def show
  end

  # POST /programs
  # POST /programs.json
  def create
    @program = Program.new(program_params)

    if @program.save
      render :show, status: :created, location: @program
    else
      render json: @program.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /programs/1
  # PATCH/PUT /programs/1.json
  def update
    if @program.update(program_params)
      render :show, status: :ok, location: @program
    else
      render json: @program.errors, status: :unprocessable_entity
    end
  end

  # DELETE /programs/1
  # DELETE /programs/1.json
  def destroy
    @program.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_program
      @program = Program.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def program_params
      params.require(:program).permit(:name, :description, :url, :visible)
    end
end
