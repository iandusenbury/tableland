class Program < ApplicationRecord
<<<<<<< HEAD
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?
=======
>>>>>>> 546114db6e68bb1ed1319ff6ee53726268d13521

  def self.search(term)
    fields_to_search = ['name', 'description', 'url']
    where_clause = fields_to_search.join(" LIKE :term OR ") + " LIKE :term "

    return Program.where(where_clause, term: "%#{term}%").limit(15)
  end

  # Associations
  has_many :experiences, dependent: :destroy
  has_many :users, through: :experiences

  has_many :sponsors, dependent: :destroy
  has_many :organizations, through: :sponsors

  has_many :media, as: :mediable, dependent: :destroy

  has_many :permissions, dependent: :destroy
  has_many :admins, through: :permissions, source: :user

  # Validations
  validates :name, presence: true
  validates :visible, inclusion: { in: [true, false] }

  def set_default_attributes
    self.visible ||= true
  end
end
