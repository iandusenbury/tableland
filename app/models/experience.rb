class Experience < ApplicationRecord
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?

  # Associations
  belongs_to :user
  belongs_to :organization, optional: true
  belongs_to :program, optional: true

  # Validations
  validates :user_id, :start_date, :title, presence: { message: "%{attribute} must be present" }
  validates :program_id, absence: { message: "An experience must not be created for both a program and organization at the same time." }, if: :organization_id?
  validates :parent_org, presence: { message: "An experience for a program must have a specified parent organization." }, if: :program_id?
  validates :current, inclusion: { in: [true, false] }

  def set_default_attributes
    self.current ||= false
  end
end
