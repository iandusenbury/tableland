class Experience < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :organization, optional: true
  belongs_to :program, optional: true

  # Validations
  validates :user_id, :start_date, :title, presence: true
end
