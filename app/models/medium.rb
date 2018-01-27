class Medium < ApplicationRecord
  belongs_to :mediable, polymorphic: true
end
