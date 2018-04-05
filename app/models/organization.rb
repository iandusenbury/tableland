class Organization < ApplicationRecord
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?

  def self.search(term)
    fields_to_search = ['lower(name)', 'lower(city)', 'lower(state)']

    results = Organization.where(
      Search.where_clause_from_fields_vis_only(fields_to_search), 
      term: Search.term_to_pattern(term),
      tautology: true)
      .sample(10)
  end

  def same_location?(another_organization)
    return  (self.address_line_1 == another_organization.address_line_1  &&
             self.address_line_2 == another_organization.address_line_2) ||
            (self.lat == another_organization.lat &&
             self.lng == another_organization.lng)
  end

  # Associations
  has_many :experiences, dependent: :destroy
  has_many :users, through: :experiences
  
  has_many :sponsors, dependent: :destroy
  has_many :programs, through: :sponsors
  
  has_many :media, as: :mediable, dependent: :destroy
  
  has_many :permissions, dependent: :destroy
  has_many :admins, -> { distinct }, through: :permissions, source: :user

  # Validations
  # Add a validation for url format
  validates :name, :address_line_1, :address_line_2, :city, :country, :lat, :lng, 
                  presence:     { message: "%{attribute} must be present" }
  validates :name, :address_line_1, :address_line_2, :city, :country,
                  length:       { maximum: 100, message: "%{attribute} must not be longer than %{count} characters" }
  validates :address_line_3, :state, :postal_code,
                  length:       { maximum: 100, message: "%{attribute} must not be longer than %{count} characters" },
                  allow_nil:    true
  validates :lat, numericality: { greater_than_or_equal_to: -90,
                                  less_than_or_equal_to: 90,
                                  message: "%{attribute} must be within -90.0 and 90.0" },
                  format:       { with: /\A-?\d{1,2}(\.\d{1,6})?\z/,
                                  message: "Invalid format for %{attribute}: %{value}, must be (-)(n)n(.nnnnnn) where each n is a number and () indicate optional" }
  validates :lng, numericality: { greater_than_or_equal_to: -180,
                                  less_than_or_equal_to: 180,
                                  message: "%{attribute} must be within -180.0 and 180.0" },
                  format:       { with: /\A-?\d{1,3}(\.\d{1,6})?\z/,
                                  message: "Invalid format for %{attribute}: %{value}, must be (-)(nn)n(.nnnnnn) where each n is a number and () indicate optional" }
  validates :visible, 
                  inclusion:    { in: [true, false] }

  private
    def set_default_attributes
      self.visible = true
    end
end
