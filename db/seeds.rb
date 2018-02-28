# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

NUM_USERS = 50
NUM_ORGS  = 50
NUM_PROGS = 20


def create_users()
  for i in 1..NUM_USERS do
    User.create( 
      first_name:   Faker::Name.first_name, 
      last_name:    Faker::Name.last_name,
      description:  Faker::Dune.quote,
      contact_url:  Faker::Internet.url,
      provider:     :linkedin,
      email:        Faker::Internet.safe_email,
      uid:          Faker::Number.number(8),
      password:     Faker::Internet.password(8)
    )
  end
end


def create_organizations()
  for i in 1..NUM_ORGS do
    Organization.create( 
      name:           Faker::Company.name, 
      description:    Faker::HitchhikersGuideToTheGalaxy.quote,
      url:            Faker::Internet.url,
      visible:        Faker::Boolean.boolean(0.8),
      category:       ["institution", "company", "organization"].sample,
      address_line_1: Faker::Address.street_address,
      address_line_2: Faker::Address.secondary_address,
      city:           Faker::Address.city,
      state:          Faker::Address.state_abbr,
      postal_code:    Faker::Address.postcode,
      country:        Faker::Address.country,
      lat:            Faker::Address.latitude,
      lng:            Faker::Address.longitude
    )
  end
end


def create_programs()
  for i in 1..NUM_PROGS do
    Program.create( 
      name:        "#{Faker::ProgrammingLanguage.name.capitalize} Club",
      description: Faker::DrWho.quote,
      url:         Faker::Internet.url,
      visible:     Faker::Boolean.boolean(0.8)
    )
  end
end


def create_experiences()
  org_recs_per_user =  { :MIN => 1, :MAX => 5 }
  prog_recs_per_user = { :MIN => 0, :MAX => 2 }

  for i in 1..NUM_USERS do
    # randomly create an 'organization' experience record for each user
    min_recs = org_recs_per_user[:MIN]
    max_recs = Faker::Number.between(org_recs_per_user[:MIN], org_recs_per_user[:MAX])
    
    for j in 0..(max_recs - min_recs) do
      if j == 0
        # this is the most recent experience
        Experience.create( 
          user_id:         i,
          organization_id: Faker::Number.between(1, NUM_ORGS),
          start_date:      1.year.ago,
          end_date:        nil,
          title:           Faker::Company.profession,
          award:           Faker::Educator.course,
          current:         true
         )
      else
        Experience.create( 
          user_id:         i,
          organization_id: Faker::Number.between(1, NUM_ORGS),
          start_date:      (j * 2).years.ago,
          end_date:        j.years.ago,
          title:           Faker::Company.profession,
          award:           Faker::Educator.course,
          current:         false
         )
      end
    end

    # randomly create a 'program' experience record for each user
    min_recs = prog_recs_per_user[:MIN]
    max_recs = Faker::Number.between(prog_recs_per_user[:MIN], prog_recs_per_user[:MAX])
    
    for j in 0..(max_recs - min_recs) do
      Experience.create( 
        user_id:         i,
        program_id:      Faker::Number.between(1, NUM_PROGS),
        start_date:      (j*2).years.ago,
        end_date:        j.years.ago,
        title:           "Member",
        current:         false
      )
    end
  end
end


def create_sponsors()
  for i in 1..NUM_PROGS do
    Sponsor.create(
      organization_id: Faker::Number.between(1, NUM_ORGS),
      program_id:      i
    )
  end
end


def create_permissions() 
  for i in 1..NUM_ORGS do
    Permission.create(
      user_id:         Faker::Number.between(1, NUM_USERS),
      organization_id: i
    )
  end

  for i in 1..NUM_PROGS do
    Permission.create(
      user_id:    Faker::Number.between(1, NUM_USERS),
      program_id: i
    )
  end
end


def create_media()
  # every user and organization get both an image and video
  for i in 1..NUM_USERS do
    Medium.create(
      mediable_id:    i,
      mediable_type:  "User",
      category:       "image",
      description:    Faker::Hipster.sentence,
      url:            Faker::LoremPixel.image("100x100", false, 'people')
    )
    
    Medium.create(
      mediable_id:    i,
      mediable_type:  "User",
      category:       "video",
      description:    Faker::Company.catch_phrase,
      url:            "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    )
  end


  for i in 1..NUM_ORGS do
    Medium.create(
      mediable_id:    i,
      mediable_type:  "Organization",
      category:       "image",
      description:    Faker::Company.catch_phrase,
      url:            Faker::LoremPixel.image("100x100", false, 'business')
    )

    Medium.create(
      mediable_id:    i,
      mediable_type:  "Organization",
      category:       "video",
      description:    Faker::Company.catch_phrase,
      url:            "https://www.youtube.com/watch?v=ksBE53CIT8E"
    )
  end

  for i in 1..NUM_PROGS do
    Medium.create(
      mediable_id:    i,
      mediable_type:  "Program",
      category:       "image",
      description:    Faker::Company.catch_phrase,
      url:            Faker::LoremPixel.image("100x100", false, 'technics')
    )

    Medium.create(
      mediable_id:    i,
      mediable_type:  "Program",
      category:       "video",
      description:    Faker::Company.catch_phrase,
      url:            "https://www.youtube.com/watch?v=VPVJzi7Ta9w"
    )
  end
end

User.create(
      first_name:   'super admin',
      last_name:    'super admin',
      description:  'test super administrator',
      role:         :super_admin,
      contact_url:  'asdf.com',
      provider:     :linkedin,
      email:        'super_admin@example.com',
      uid:          '1',
      password:     'password'
)

User.create(
      first_name:   'admin',
      last_name:    'admin',
      description:  'test administrator',
      role:         :admin,
      contact_url:  'asdf.com',
      provider:     :linkedin,
      email:        'admin@example.com',
      uid:          '2',
      password:     'password'
)

create_users()
create_organizations()
create_programs()
create_experiences()
create_sponsors()
create_media()
create_permissions()
