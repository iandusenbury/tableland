module Api::V1
  class UserSerializer < ActiveModel::Serializer
    # Attributes to include in payload
    attributes  :id,
                :type, 
                :first_name, 
                :last_name,
                :description, 
                :contact_url,
                :main_title,
                :main_location, 
                :role,
                :visible,
                :link

    # Methods for custom attributes
    def type
      object.class.name
    end
    def main_title
      object.experiences.where(current: true).pluck(:title).first
    end
    def main_location
      current_organization, current_program = object.experiences.where(current: true).pluck(:organization_id, :program_id).first
      return object.organizations.where(id: current_organization).pluck(:name).first if current_organization.present?
      object.programs.where(id: current_program).pluck(:name).first if current_program.present?
    end
    def link
      view_context.v1_user_url(object)
    end

    # Available associations
    has_many :media
    has_many :experiences
  end
end
