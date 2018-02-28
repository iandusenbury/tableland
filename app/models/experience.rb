class Experience < ApplicationRecord
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?

  # Associations
  belongs_to :user
  belongs_to :organization, optional: true
  belongs_to :program, optional: true

  # Validations
  validates :user_id, :start_date, :title, presence: true
  validates :program_id, absence: true, if: :organization_id?

  def set_default_attributes
    self.current ||= false
  end
end
