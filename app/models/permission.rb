class Permission < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :organization, optional: true
  belongs_to :program, optional: true
  
  # Validations
  validates :user_id, presence: { message: "%{attribute} must be present" }
  validates :program_id, absence: { message: "A permission must not be granted for both a program and organization at the same time." }, if: :organization_id?
end
