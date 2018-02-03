class Medium < ApplicationRecord
  # Associations
  belongs_to :mediable, polymorphic: true

  # Validations
  validates :mediable_id, :mediable_type, presence: true
end
