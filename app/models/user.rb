class User < ApplicationRecord
  has_many :experiences, dependent: :destroy
  has_many :organization, through: :experiences
  has_many :programs, through: :experiences
  has_many :media, as: :mediable, dependent: :destroy
end
