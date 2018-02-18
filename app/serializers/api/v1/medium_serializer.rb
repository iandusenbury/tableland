module Api::V1
  class MediumSerializer < ActiveModel::Serializer
    # Attributes to include in payload
    attributes  :id,
                :type,
                :category,
                :description,
                :url,
                :link

    # Methods for custom attributes
    def type
      object.class.name
    end
    def link
      view_context.v1_medium_url(object)
    end
  end
end
