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
              :link

  # Methods for custom attributes
  def type
    object.class.name
  end
  def main_title
    object.experiences.where(primary: true).pluck(:title).first
  end
  def main_location
    primary_organization, primary_program = object.experiences.where(primary: true).pluck(:organization_id, :program_id).first
    return object.organizations.where(id: primary_organization).pluck(:name).first if primary_organization.present?
    object.programs.where(id: primary_program).pluck(:name).first if primary_program.present?
  end
  def link
    view_context.user_url(object)
  end

  # Available associations
  has_many :media
  has_many :experiences
end
