class User < ApplicationRecord
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?

  # Associations
  has_many :experiences, dependent: :destroy
  has_many :organizations, through: :experiences
  has_many :programs, through: :experiences

  has_many :media, as: :mediable, dependent: :destroy

  has_many :permissions, dependent: :destroy
  has_many :org_edits, through: :permissions, source: :organization
  has_many :prog_edits, through: :permissions, source: :program

  # Validations
  validates :first_name, :last_name, :linkedin_id, :contact_url, :role, presence: true
  validates :visible, inclusion: { in: [true, false] }
  
  def set_default_attributes
    self.role ||= :user
    self.visible ||= true
  end
end
