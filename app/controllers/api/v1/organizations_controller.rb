module Api::V1
  class OrganizationsController < ApiBaseController
    before_action :set_organization, only: [:show, :update, :grant_permission, :admins]
    before_action :allow_if_visible, except: [:index, :show] 

    # GET /v1/organizations
    def index
      @organizations = Organization.all
      render json: @organizations, include: 'media', status: :ok
    end

    # GET /v1/organizations/{id}
    def show
      render json: @organization, include: 'media,users.media,sponsoring.media', status: :ok
    end

    # POST /v1/organizations
    def create
      @organization = Organization.new(create_organization_params)
      if @organization.valid?
        @organization = prevent_duplication(@organization)
      end
      @organization.save!
      render json: @organization, include: '', status: :created
    end

    # PATCH/PUT /v1/organizations/{id}
    def update
      if @organization.update(update_organization_params)
        render json: @organization, include: '', status: :ok
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end

    # POST /v1/organizations/{id}/permissions
    def grant_permission
      @permission = @organization.permissions.new(admin_params)
      if @organization.save
        render json: @organization, include: 'admins', status: :created
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end

    # GET /v1/organizations/{id}/admins
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
      def set_organization
        @organization = Organization.find(params[:id])
      end

      # Only allow access to certain actions if the current user is visible
      def allow_if_visible
        raise ExceptionTypes::UnauthorizedError.new("Your account has been blocked") unless (current_user.visible? || current_user.super_admin?)
      end

      # Attempt to prevent the creation of the same organization with slightly different names
      def prevent_duplication(valid_new_organization)
        potential_duplicate = find_duplicate(valid_new_organization.name)
        if potential_duplicate && potential_duplicate.same_location?(valid_new_organization)
          return potential_duplicate
        end
        valid_new_organization
      end

      # Attempt to find an existing organization with the exact same name or almost the exact 
      # same name as the argument
      def find_duplicate(name_to_check)
        return Organization.find_by(name: name_to_check) ||
               Organization.find_by(name: name_to_check.titleize) ||
               Organization.find_by(name: name_to_check.downcase)
      end

      # Permit only the appropriate parameters for the creation of a new organization
      def create_organization_params
        params.require(:organization).permit(:name, :address_line_1, :address_line_2, :address_line_3, :city, :state, :postal_code, :country, :lat, :lng)
      end

      # Permit only the appropriate parameters for the update of an existing organization
      def update_organization_params
        params.require(:organization).permit(:name, :description, :url, :visible, :address_line_1, :address_line_2, :address_line_3, :city, :state, :postal_code, :country, :lat, :lng)
      end

      # Permit only a user_id or email when assigning an admin to an existing organization
      def admin_params
        params.require(:admin).permit(:user_id)
      end
  end
end
