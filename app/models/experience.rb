class Experience < ApplicationRecord
  belongs_to :user
  belongs_to :organization
  belongs_to :program
end
