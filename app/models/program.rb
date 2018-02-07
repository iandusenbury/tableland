class Program < ApplicationRecord
  # Associations
  has_many :experiences, dependent: :destroy
  has_many :users, through: :experiences

  has_many :sponsors, dependent: :destroy
  has_many :organizations, through: :sponsors

  has_many :media, as: :mediable, dependent: :destroy
  
  has_many :permissions, dependent: :destroy
  has_many :admins, through: :permissions, source: :user

  # Validations
  validates :name, :visible, presence: true
end
