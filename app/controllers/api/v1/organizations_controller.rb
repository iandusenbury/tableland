module Api::V1
  class OrganizationsController < ApiBaseController
    before_action :set_organization, only: [:show, :update, :grant_permission, :admins]
    before_action :allow_if_visible, except: [:index, :show] 
    before_action :validate_update_params, only: :update

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
      @organization.update!(update_organization_params)
      render json: @organization, include: '', status: :ok
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

      # Validate the request payload and permissions when updating an existing organization
      def validate_update_params
        if current_user.user?
          raise ExceptionTypes::UnauthorizedError.new("Admin access only")
        end
        if current_user.admin?
          raise ExceptionTypes::UnauthorizedError.new("You do not have permission to edit the organization with ID #{@organization.id}") unless @organization.admins.exists? current_user.id
        end
        validate_url
        validate_visible
      end

      # Attempt to prevent the creation of the same organization with slightly different names
      # by trying to find an existing organization with almost the exact same name and either
      # an exact match for the first two address lines or an exact match for the geographic coordinates.
      def prevent_duplication(valid_new_organization)
        new_name = valid_new_organization.name
        found_duplicate = nil;
        
        same_name_organizations = Organization.where("LOWER(name) = ?", new_name.downcase)

        same_name_organizations.each do |organization|
          found_duplicate = organization if organization.same_location?(valid_new_organization)
          break if found_duplicate.present?
        end

        return found_duplicate || valid_new_organization
      end

      # Validate that the url attribute in the payload does not contain invalid characters or spaces
      # This parse method is very lenient and could be made more strict if we want
      def validate_url
        url = params[:url] || params[:organization][:url]
        begin
          URI.parse(url) if url
        rescue URI::InvalidURIError
          raise ExceptionTypes::BadRequestError.new("Invalid characters used in URL: #{url}")
        end
      end

      # Validate that the visible attribute in the payload is strictly
      # boolean true or false
      def validate_visible
        visible = params[:visible] || params[:organization][:visible]

        if visible && visible.to_s != "true" && visible.to_s != "false"
          raise ExceptionTypes::BadRequestError.new("Invalid format for visible: #{visible}, must be boolean true or false")
        end
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
