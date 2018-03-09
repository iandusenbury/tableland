module Api::V1
  class OrganizationsController < ApiBaseController
    before_action :set_organization, only: [:show, :update, :grant_permission, :admins]
    before_action :allow_if_visible, except: [:index, :show] 
    before_action :require_correct_admin, only: [:update, :grant_permission]
    before_action :validate_update_params, only: :update
    before_action :check_index_permission, only: :index
    before_action :check_get_admins_permission, only: :admins

    # GET /v1/organizations
    def index
      @organizations = Organization.all
      render json: @organizations, include: '', status: :ok
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
      new_admin = validate_grant_params
      @organization.permissions.new(user_id: new_admin.id)
      @organization.save!
      render json: new_admin, include: '', status: :created
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

      # Restrict certain actions to only admins with permission for the specified organization
      def require_correct_admin
        if current_user.user?
          raise ExceptionTypes::UnauthorizedError.new("Admin access only")
        end
        if current_user.admin?
          raise ExceptionTypes::UnauthorizedError.new("You do not have permission to modify the organization with ID #{@organization.id}") unless @organization.admins.exists? current_user.id
        end
      end

      # Validate the request payload when updating an existing organization
      def validate_update_params
        validate_url
        validate_visible
      end

      # Validate that an existing user can be found for granting the new permission
      # Admins can only provide an email while super admins can provide email or ID
      def validate_grant_params
        found_user = nil
        email = nil
        user_id = nil

        email = params[:email]
        user_id = params[:user_id] 

        if current_user.admin?
          raise ExceptionTypes::BadRequestError.new("An email must be provided") unless email.present?
          found_user = User.find_by!(email: email)
        elsif current_user.super_admin?
          if user_id.present?
            found_user = User.find(user_id)
          elsif email.present?
            found_user = User.find_by!(email: email)
          else
            raise ExceptionTypes::BadRequestError.new("A user ID or email must be provided")
          end
        end

        found_user.update!(role: :admin) if found_user.user?
        found_user
      end

      # Ensure that only super admins can view all organizations
      def check_index_permission
        raise ExceptionTypes::UnauthorizedError.new("You do not have permission to view all organizations") unless current_user.super_admin?
      end

      # Ensure that only super admins can view all admins for a specific organization
      def check_get_admins_permission
        raise ExceptionTypes::UnauthorizedError.new("You do not have permission to view all admins for the specified organization") unless current_user.super_admin?
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

  end
end
