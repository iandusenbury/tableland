module Api::V1
  class OrganizationSerializer < ActiveModel::Serializer
    # Attributes to include in payload
    attributes  :id,
                :type, 
                :name, 
                :description, 
                :url, 
                :address_line_1, 
                :address_line_2,
                :address_line_3,
                :city,
                :state,
                :postal_code,
                :country,
                :lat,
                :lng,
                :visible,
                :link

    # Methods for custom attributes
    def type
      object.class.name
    end
    def link
      view_context.api_v1_organization_url(object)
    end

    # Available associations
    has_many :media
    has_many :users do
      object.users.where(visible: true, experiences: { end_date: nil })
    end
    has_many :programs, key: :sponsoring do
      object.programs.where(visible: true)
    end
    has_many :admins do
      object.admins
    end
  end
end
