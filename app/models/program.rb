class Program < ApplicationRecord
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?

  def self.search(term)
    fields_to_search = ['lower(name)']

    results = Program.where(
      Search.where_clause_from_fields_vis_only(fields_to_search), 
      term: Search.term_to_pattern(term),
      tautology: true)
      .sample(10)
  end

  # Associations
  has_many :experiences, dependent: :destroy
  has_many :users, through: :experiences

  has_many :sponsors, dependent: :destroy
  has_many :organizations, through: :sponsors

  has_many :media, as: :mediable, dependent: :destroy

  has_many :permissions, dependent: :destroy
  has_many :admins, -> { distinct }, through: :permissions, source: :user

  # Validations
  validates :name,    presence:   { message: "%{attribute} must be present" }
  validates :name,    length:     { maximum: 100, message: "%{attribute} must not be longer than %{count} characters" }
  validates :visible, inclusion:  { in: [true, false] }

  private
    def set_default_attributes
      self.visible = true
    end
end
