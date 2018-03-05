module Api::V1
  class ExperienceSerializer < ActiveModel::Serializer
    # Attributes to include in payload
    attributes  :id,
                :type,
                :start_date,
                :end_date,
                :title,
                :award,
                :current,
                :link

    attribute   :parent_organization, if: :program_present?
    
    # Methods for custom attributes and associations
    def type
      object.class.name
    end
    def link
      view_context.v1_user_experience_url(object.user, object)
    end
    def program_present?
      object.program.present?
    end
    def organization_present?
      object.organization.present?
    end
    def parent_organization
      object.parent_org
    end

    # Available associations
    belongs_to  :user
    belongs_to  :program, if: :program_present?
    belongs_to  :organization, if: :organization_present?
  end
end
