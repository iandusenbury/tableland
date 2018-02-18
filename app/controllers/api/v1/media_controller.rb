class MediaController < ApplicationController
  before_action :set_medium, only: [:show, :update, :destroy]

  # GET /media
  # GET /media.json
  def index
    @media = Medium.all
    render json: @media, status: :ok
  end

  # GET /media/1
  # GET /media/1.json
  def show
    render json: @medium, status: :ok
  end

  # POST /media
  # POST /media.json
  def create
    @medium = Medium.new(medium_params)

    if @medium.save
      render json: @medium, status: :created
    else
      render json: @medium.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /media/1
  # PATCH/PUT /media/1.json
  def update
    if @medium.update(medium_params)
      render json: @medium, status: :ok
    else
      render json: @medium.errors, status: :unprocessable_entity
    end
  end

  # DELETE /media/1
  # DELETE /media/1.json
  def destroy
    @medium.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medium
      @medium = Medium.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def medium_params
      params.require(:medium).permit(:mediable_id, :mediable_type, :category, :description, :url)
    end
end
