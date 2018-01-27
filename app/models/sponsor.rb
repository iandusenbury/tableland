class Sponsor < ApplicationRecord
  belongs_to :organization
  belongs_to :program
end
