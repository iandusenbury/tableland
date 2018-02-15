class User < ApplicationRecord
  acts_as_token_authenticatable

  enum role: [:user, :admin, :super_admin]
  after_initialize :set_default_attributes, :if => :new_record?

  def set_default_attributes
    self.role ||= :user
    self.visible ||= true
  end

  def self.from_omniauth(auth)
    @user = where(provider: auth.provider, uid: auth.uid)

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
  has_many :org_edits, through: :permissions, source: :organization
  has_many :prog_edits, through: :permissions, source: :program

  accepts_nested_attributes_for :media, allow_destroy: true

  # Validations
  validates :first_name, :last_name, :contact_url, presence: true
  # validates :visible, inclusion: { in: [true, false] }
end
