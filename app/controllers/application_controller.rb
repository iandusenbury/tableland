class ApplicationController < ActionController::API
  # Allow the current context of all controllers to be accessible in the serializers
  serialization_scope :view_context
end
