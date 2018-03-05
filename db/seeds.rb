# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

STEM_CAREERS = [
  'Aerospace Engineer', 'Anthropologist', 'Archeologist', 'Architect', 
  'Engineering Manager', 'Astronomer', 'Atmospheric Space Scientist', 
  'Biochemical Engineer', 'Biochemist', 'Biophysicist', 
  'Bioinformatics Scientist', 'Biostatistician', 'Cartographer', 
  'Photogrammetrist', 'Chemical Engineer', 'Chemist', 'Clinical Data Manager', 
  'Computer Hardware Engineer', 'Computer Scientist', 'Information Scientist', 
  'Conservation Scientist', 'Economist', 'Electrical Engineer', 
  'Electronics Engineer', 'Energy Engineer', 
  'Environmental Health and Safety Engineer', 'Environmental Planner', 
  'Environmental Scientist', 'Geneticist', 'Geographer', 'Geoscientist', 
  'Health and Safety Engineer', 'Hydrologist', 'Industrial Engineer', 
  'Manufacturing Engineer', 'Marine Engineer', 'Naval Architect', 
  'Materials Engineer', 'Materials Scientist', 'Mathematical Technician', 
  'Mathematician', 'Mechanical Engineer', 'Mechatronics Engineer', 
  'Microbiologist', 'Microsystems Engineer', 'Mining and Geological Engineer', 
  'Molecular and Cellular Biologist', 'Nanosystems Engineer', 'Nuclear Engineer', 
  'Park Naturalist', 'Petroleum Engineer', 'Photonics Engineer', 'Physicist', 
  'Quality Control Analyst', 'Remote Sensing Scientist', 
  'Remote Sensing Technician', 'Robotics Engineer', 
  'Solar Energy Systems Engineer', 'Statistician', 'Survey Researcher', 
  'Transportation Planner', 'Validation Engineer' 
]

DEGREE_PREFIX = [ 'Master of Science', 'Bachelor of Science', 'Doctor of' ]

STEM_DEGREES = [
  'Physics', 'Actuarial Science', 'Chemistry', 'Biology', 
  'Mathematics', 'Applied Mathematics', 'Statistics', 
  'Computer Science', 'Computational Science', 'Biochemistry', 
  'Computer Engineering', 'Electrical Engineering', 'Electronics',
  'Mechanical Engineering', 'Industrial Engineering', 
  'Information Science', 'Information Technology', 
  'Civil Engineering', 'Aerospace Engineering', 
  'Chemical Engineering', 'Astrophysics', 'Astronomy', 'Optics', 
  'Nanotechnology', 'Nuclear Physics', 'Mathematical Biology', 
  'Operations Research', 'Neurobiology', 'Biomechanics', 
  'Bioinformatics', 'Acoustical Engineering', 
  'Geographic Information Systems', 'Atmospheric Sciences', 
  'Software Engineering'
]

STEM_COMPANIES = [
  'BP America', 'Exelon Corporation', 'DuPont', 'Alcoa', 'Sprint', 
  'Teleperformance', 'Xcel Energy', 'Nestle USA', 'Apple', 
  'Graphic Packaging International', 'Southwest Airlines', 
  'Amazon', 'Frontier Communications', 'MidAmerican Energy Company', 
  'Yazaki North America, Inc.', 'Parsons Corp', 'BAE Systems', 
  'Amtrak', 'Puget Sound Energy', 'Cubic Corporation', 
  'LP Building Products', 'Transdev North America', 'Intelligrated', 
  'STERIS Corporation', 'Siemens Corporation', 'Intel', 'Google', 
  'Microsoft', 'Oracle', 'IBM', 'Hewlett-Packard', 'Symantec'
]

NUM_USERS = 50
NUM_COMPS = STEM_COMPANIES.length
NUM_INSTS = 15
NUM_ORGS  = 15
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

  make_sample_invisible(User.all, 0.10)
end


def create_companies()
  for i in 1..NUM_COMPS do
    Organization.create(  
      name:           STEM_COMPANIES[i],
      description:    Faker::HitchhikersGuideToTheGalaxy.quote,
      url:            Faker::Internet.url,
      category:       "company",
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

  make_sample_invisible(Organization.all, 0.10)
end


def create_institutions()
  for i in 1..NUM_INSTS do
    Organization.create( 
      name:           Faker::Educator.university, 
      description:    Faker::HitchhikersGuideToTheGalaxy.quote,
      url:            Faker::Internet.url,
      category:       "institution",
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

  make_sample_invisible(Organization.all, 0.10)
end


def create_organizations()
  for i in 1..NUM_ORGS do
    Organization.create( 
      name:           Faker::Hobbit.location + " " + 
                        ["Society", "Association", "Foundation"].sample, 
      description:    Faker::HitchhikersGuideToTheGalaxy.quote,
      url:            Faker::Internet.url,
      category:       "organization",
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

  make_sample_invisible(Organization.all, 0.10)
end


def create_programs()
  for i in 1..NUM_PROGS do
    Program.create( 
      name:        "#{Faker::ProgrammingLanguage.name.capitalize} Club",
      description: Faker::DrWho.quote,
      url:         Faker::Internet.url
    )
  end

  make_sample_invisible(Program.all, 0.10)
end


def create_experiences()
  org_recs_per_user =  { :MIN => 1, :MAX => 4 }
  prog_recs_per_user = { :MIN => 0, :MAX => 2 }
  total_org_recs = NUM_ORGS + NUM_COMPS + NUM_INSTS

  for i in 1..NUM_USERS do
    # randomly create an 'organization' experience record for each user
    min_recs = org_recs_per_user[:MIN]
    max_recs = Faker::Number.between(
      org_recs_per_user[:MIN], 
      org_recs_per_user[:MAX])
    
    for j in 0..(max_recs - min_recs) do
      if j == 0
        # this is the most recent experience
        Experience.create( 
          user_id:         i,
          organization_id: Faker::Number.between(1, total_org_recs),
          start_date:      1.year.ago,
          end_date:        nil,
          title:           STEM_CAREERS.sample,
          award:           DEGREE_PREFIX.sample + " " + STEM_DEGREES.sample,
          current:         true
         )
      else
        Experience.create( 
          user_id:         i,
          organization_id: Faker::Number.between(1, total_org_recs),
          start_date:      (j * 2).years.ago,
          end_date:        j.years.ago,
          title:           STEM_CAREERS.sample,
          award:           DEGREE_PREFIX.sample + " " + STEM_DEGREES.sample,
          current:         false
         )
      end
    end

    # randomly create a 'program' experience record for each user
    min_recs = prog_recs_per_user[:MIN]
    max_recs = Faker::Number.between(
      prog_recs_per_user[:MIN], 
      prog_recs_per_user[:MAX])
    
    for j in 0..(max_recs - min_recs) do
      Experience.create( 
        user_id:         i,
        program_id:      Faker::Number.between(1, NUM_PROGS),
        start_date:      (j*2).years.ago,
        end_date:        j.years.ago,
        title:           ["Member", "Chair", "Volunteer", "President"].sample,
        current:         false,
        parent_org:      Faker::Number.between(1, total_org_recs)
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


def make_sample_invisible(collection, percentage)
  # make some collections invisible (when not possible during creation)
  for i in 1..(collection.length * percentage)
    collection.all.sample.update(visible: false)
  end
end


# create administration accounts
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
User.find_by(uid: '1').update(visible: false)

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
User.find_by(uid: '2').update(visible: false)


create_users()
create_companies()
create_institutions()
create_organizations()
create_programs()
create_experiences()
create_sponsors()
create_media()
create_permissions()
