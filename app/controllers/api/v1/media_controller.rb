module Api::V1
  class MediaController < ApiBaseController
    before_action :set_mediable, only: [:create, :update, :destroy]
    before_action :set_medium, only: [:show, :update, :destroy]

    # Unreachable
    # GET /media
    # GET /media.json
    def index
      @media = Medium.all
      render json: @media, status: :ok
    end

    # Unreachable
    # GET /media/1
    # GET /media/1.json
    def show
      render json: @medium, status: :ok
    end

    # POST /media
    # POST /media.json
    def create
      # Check for existence of mediable here or in the set method?
      @medium = @mediable.media.new(medium_params)
      # @medium = Medium.new(medium_params)

      if @mediable.save
        render json: @medium, include: '', status: :created
      else
        render json: @mediable.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /media/1
    # PATCH/PUT /media/1.json
    def update
      if @medium.update(medium_params)
        render json: @medium, include: '', status: :ok
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
      def set_mediable
        @mediable = nil
        if params[:user_id]
          @mediable = User.find(params[:user_id])
        elsif params[:organization_id]
          @mediable = Organization.find(params[:organization_id])
        elsif params[:program_id]
          @mediable = Program.find(params[:program_id])
        end
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_medium
        @medium = @mediable.media.find(params[:id]) if @mediable
        # @medium = Medium.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def medium_params
        params.require(:medium).permit(:mediable_id, :mediable_type, :category, :description, :url)
      end
  end
end
