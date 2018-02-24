module Api::V1
  class ProgramSerializer < ActiveModel::Serializer
    # Attributes to include in payload
    attributes  :id,
                :type, 
                :name, 
                :description, 
                :url,
                :link

    # Methods for custom attributes
    def type
      object.class.name
    end
    def link
      view_context.v1_program_url(object)
    end

    # Available associations
    has_many :media
    has_many :users do
      object.users.where(visible: true, experiences: { end_date: nil })
    end
    has_many :organizations, key: :sponsors do
      object.organizations.where(visible: true)
    end
    has_many :admins do
      object.admins
    end
  end
end
