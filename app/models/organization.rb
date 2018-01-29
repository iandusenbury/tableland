class Organization < ApplicationRecord
  # Associations
  has_many :experiences, dependent: :destroy
  has_many :users, through: :experiences
  has_many :sponsors, dependent: :destroy
  has_many :programs, through: :sponsors
  has_many :media, as: :mediable, dependent: :destroy

  # Validations
  validates :name, :visible, :address_line_1, :address_line_2, :city, :country, presence: true
end
