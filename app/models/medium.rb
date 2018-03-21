class Medium < ApplicationRecord
  # Associations
  belongs_to :mediable, polymorphic: true

  # Validations
  validates :mediable_id, :mediable_type, :category, presence: { message: "%{attribute} must be present" }
  validates :category, inclusion: { in: %w(image video), message: "%{value} is not a valid category, must be image or video" }
end
