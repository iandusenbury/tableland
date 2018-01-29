class User < ApplicationRecord
  # Associations
  has_many :experiences, dependent: :destroy
  has_many :organizations, through: :experiences
  has_many :programs, through: :experiences
  has_many :media, as: :mediable, dependent: :destroy

  # Validations
  validates :first_name, :last_name, :linkedin_id, :contact_url, :visible, :role, presence: true
end
