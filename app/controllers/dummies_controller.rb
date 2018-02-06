class DummiesController < ApplicationController
  before_action :set_dummy, only: [:show, :update, :destroy]

  # GET /dummies
  # GET /dummies.json
  def index
    @dummies = Dummy.all
    render json: @dummies.to_json( :only => [:id, :first_name, :last_name, :email, :current_occupation] ) 
  end

  # GET /dummies/1
  # GET /dummies/1.json
  def show
  end

  # POST /dummies
  # POST /dummies.json
  def create
    @dummy = Dummy.new(dummy_params)

    if @dummy.save
      render :show, status: :created, location: @dummy
    else
      render json: @dummy.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dummies/1
  # PATCH/PUT /dummies/1.json
  def update
    if @dummy.update(dummy_params)
      render :show, status: :ok, location: @dummy
    else
      render json: @dummy.errors, status: :unprocessable_entity
    end
  end

  # DELETE /dummies/1
  # DELETE /dummies/1.json
  def destroy
    @dummy.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dummy
      @dummy = Dummy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dummy_params
      params.require(:dummy).permit(:first_name, :last_name, :email, :current_occupation)
    end
end
