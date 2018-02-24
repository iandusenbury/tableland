module Api::V1
  class OrganizationsController < ApiBaseController
    before_action :set_organization, only: [:show, :update, :grant_permission, :admins, :destroy]

    # GET /organizations
    # GET /organizations.json
    def index
      @organizations = Organization.all
      render json: @organizations, include: 'media', status: :ok
    end

    # GET /organizations/1
    # GET /organizations/1.json
    def show
      render json: @organization, include: 'media,users.media,sponsoring.media', status: :ok
    end

    # POST /organizations
    # POST /organizations.json
    def create
      @organization = Organization.new(organization_params)

      if @organization.save
        render json: @organization, include: '', status: :created
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /organizations/1
    # PATCH/PUT /organizations/1.json
    def update
      if @organization.update(organization_params)
        render json: @organization, include: '', status: :ok
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end

    # POST /organizations/1/permissions
    # POST /organizations/1/permissions.json
    def grant_permission
      @permission = @organization.permissions.new(admin_params)
      if @organization.save
        render json: @organization, include: 'admins', status: :created
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end

    # GET /organizations/1/admins
    # GET /organizations/1/admins.json
    def admins
      render json: @organization, include: 'admins', status: :ok
    end

    # Unreachable
    # DELETE /organizations/1
    # DELETE /organizations/1.json
    def destroy
      @organization.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_organization
        @organization = Organization.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def organization_params
        params.require(:organization).permit(:name, :description, :url, :visible, :category, :address_line_1, :address_line_2, :address_line_3, :city, :state, :postal_code, :country)
      end

      def admin_params
        params.require(:admin).permit(:user_id)
      end
  end
end
