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


    private
      # Helps all controllers implicitly locate the serializers
      def set_serializer_namespace
        self.namespace_for_serializer = Api::V1
      end
  end
end
