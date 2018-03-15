module Api::V1
  class ApiBaseController < ApplicationController
    before_action :set_serializer_namespace

    # Allow the current context of all controllers to be accessible in the serializers
    serialization_scope :view_context

    # GET /v1/search
    def search
      term = params[:term] || ''
      @results = []
      @results << Program.search(term)
      @results << User.search(term)
      @results << Organization.search(term)
      render json: @results.flatten, root: "results", include: 'media', status: :ok
    end

    protected
      # Only allow access to certain actions if the current user is visible
      def allow_if_visible
        raise ExceptionTypes::UnauthorizedError.new("Your account has been blocked") unless (current_user.visible? || current_user.super_admin?)
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

      # Attempt to find admin permissions matching the specified user for the specified resource
      def find_permissions_to_revoke(resource)
        raise ExceptionTypes::BadRequestError.new("user_id must be present") unless params[:user_id].present?
        
        found_user = User.find(params[:user_id])
        raise ExceptionTypes::UnauthorizedError.new("You are not authorized to modify the permissions for the user with ID #{found_user.id}") if found_user.super_admin?

        found_permissions = resource.permissions.where(user_id: found_user.id)

        found_permissions
      end

    private
      # Helps all controllers implicitly locate the serializers
      def set_serializer_namespace
        self.namespace_for_serializer = Api::V1
      end
  end
end
