class Sponsor < ApplicationRecord
  # Associations
  belongs_to :organization
  belongs_to :program

  # Validations
  validates :organization_id, :program_id, presence: { message: "%{attribute} must be present" }
end
