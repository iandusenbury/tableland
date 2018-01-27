class Program < ApplicationRecord
  has_many :experiences, dependent: :destroy
  has_many :users, through: :experiences
  has_many :sponsors, dependent: :destroy
  has_many :organizations, through: :sponsors
  has_many :media, as: :mediable, dependent: :destroy
end
