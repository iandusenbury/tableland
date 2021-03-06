class User < ApplicationRecord
  # Callback for setting defaults, defined below
  after_initialize :set_default_attributes, if: :new_record?
  # Callback for clearing permissions if an admin is demoted
  after_update :check_demotion
  acts_as_token_authenticatable

  enum role: [:user, :admin, :super_admin]

  def self.search(term)
    fields_to_search = ['lower(first_name)', 'lower(last_name)', 'lower(experiences.title)' ]

    results = User.select('users.*')
      .distinct
      .where(Search.where_clause_from_fields_vis_only(fields_to_search), 
        term: Search.term_to_pattern(term),
        tautology: true)
      .joins('INNER JOIN experiences ON users.id=experiences.user_id')
      .sample(10)
  end

  def self.from_omniauth(auth)
    @user = where(provider: auth.provider, uid: auth.uid).first

    return @user if @user.present?

    User.transaction do
      @user = User.create!(
        provider: auth.provider,
        uid: auth.uid,
        email: auth.info.email,
        first_name: auth.info.first_name,
        last_name: auth.info.last_name,
        contact_url: auth.info.urls.public_profile,
        password: Devise.friendly_token[0,20]
      )
      @user.media.create!(
        url: auth.info.image,
        category: 'image',
        description: 'LinkedIn profile photo'
      )
    end

    @user
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable,
         omniauth_providers: %i[linkedin]

  # Associations
  has_many :experiences, dependent: :destroy
  has_many :organizations, through: :experiences
  has_many :programs, through: :experiences

  has_many :media, as: :mediable, dependent: :destroy

  has_many :permissions, dependent: :destroy
  has_many :org_edits, -> { distinct }, through: :permissions, source: :organization
  has_many :prog_edits, -> { distinct }, through: :permissions, source: :program

  # Validations
  validates :first_name, :last_name, presence: { message: "%{attribute} must be present" },
                                     length: { maximum: 50, message: "%{attribute} must not be longer than %{count} characters" } 
  validates :contact_url, :role, presence: { message: "%{attribute} must be present" }
  validates :visible, inclusion: { in: [true, false] }
  
  private
    def set_default_attributes
      self.role ||= :user
      self.visible = true
    end

    def check_demotion
      if  self.saved_change_to_role?(from: "admin", to: "user") || 
          self.saved_change_to_role?(from: "super_admin", to: "user")
        self.permissions.destroy_all
      end
    end
end
