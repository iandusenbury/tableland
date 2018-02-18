module Api::V1
  class ExperienceSerializer < ActiveModel::Serializer
    # Attributes to include in payload
    attributes  :id,
                :type,
                :start_date,
                :end_date,
                :title,
                :award,
                :primary,
                :link
    
    # Methods for custom attributes and associations
    def type
      object.class.name
    end
    def link
      view_context.api_v1_experience_url(object)
    end
    def program_present?
      object.program.present?
    end
    def organization_present?
      object.organization.present?
    end

    # Available associations
    belongs_to  :user
    belongs_to  :program, if: :program_present?
    belongs_to  :organization, if: :organization_present?
  end
end
