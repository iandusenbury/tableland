class Program < ApplicationRecord
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?

  def self.search(term)
    fields_to_search = ['name', 'description', 'url']
    clause = ApplicationController.build_like_clause(fields_to_search)

    search_results = []
    search_results << Program.where(clause, term: "%#{term}%")

    return search_results
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
