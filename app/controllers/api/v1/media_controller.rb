module Api::V1
  class MediaController < ApiBaseController
    before_action :set_mediable, only: [:create, :update, :destroy]
    before_action :set_medium, only: [:update, :destroy]
    before_action :check_size_limit, only: :create

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

    # POST /v1/{mediable}/{mediable_id}/media
    def create
      @medium = @mediable.media.new(medium_params)
      @medium.save!
      render json: @medium, include: '', status: :created
    end

    # PATCH/PUT /v1/{mediable}/{mediable_id}/media/{id}
    def update
      if @medium.update(medium_params)
        render json: @medium, include: '', status: :ok
      else
        render json: @medium.errors, status: :unprocessable_entity
      end
    end

    # DELETE /v1/{mediable}/{mediable_id}/media/{id}
    def destroy
      @medium.destroy
    end

    private
      # Determine which type of parent resource was specified in the path to modifying
      # their media collection and check that the current_user has permission to do so
      def set_mediable
        @mediable = nil
        if params[:user_id]
          @mediable = User.find(params[:user_id])
          restrict_action(@mediable) unless @mediable.id == current_user.id
        elsif params[:organization_id]
          @mediable = Organization.find(params[:organization_id])
          restrict_action(@mediable) unless current_user.super_admin? || current_user.admin? && @mediable.admins.exists?(current_user.id)
        elsif params[:program_id]
          @mediable = Program.find(params[:program_id])
          restrict_action(@mediable) unless current_user.super_admin? || current_user.admin? && @mediable.admins.exists?(current_user.id)
        end
      end

      def set_medium
        @medium = @mediable.media.find(params[:id]) if @mediable
      end

      # Prevent more than two media items for any parent resource
      def check_size_limit
        if @mediable && @mediable.media.size >= 2
          raise ExceptionTypes::BadRequestError.new("You have already reached the limit of 2 media items, please delete one before attempting to create another.")
        end
      end

      # Raise an exception if the current_user failed the permissions check
      def restrict_action(parent_resource)
        raise ExceptionTypes::UnauthorizedError.new("You do not have permission to modify the media for the #{parent_resource.class.name} with ID #{parent_resource.id}")
      end

      # Permit only the appropriate attributes when creating and updating media
      def medium_params
        params.require(:medium).permit(:category, :url)
      end
  end
end
