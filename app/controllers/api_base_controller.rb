class ApiBaseController < ApplicationController
#  before_action :set_serializer_namespace

  # Allow the current context of all controllers to be accessible in the serializers
#  serialization_scope :view_context

  def search
    term = params[:term] || ''
    @results = { "results": [] }
    @results[:results].concat User.search(term)
    @results[:results].concat Organization.search(term)
    @results[:results].concat Program.search(term)
#    render json: @results, root: "results", include: 'media', status: :ok
    render json: @results, include: 'media', status: :ok
  end

  private
    # Helps all controllers implicitly locate the serializers
    def set_serializer_namespace
      self.namespace_for_serializer = Api::V1
    end
end
