# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

NUM_USERS = 50
NUM_ORGS  = 50
NUM_PROGS = 20

def create_users(num_users)
  for i in 1..num_users do
    User.create( 
                first_name:   Faker::Name.first_name, 
                last_name:    Faker::Name.last_name,
                linkedin_id:  Faker::Lorem.characters(10),
                contact_url:  Faker::Internet.url,
                visible:      Faker::Boolean.boolean(0.8),
                role:         :user,
                description:  Faker::Lorem.paragraph
    )
  end
end

def create_organizations(num_orgs)
  for i in 1..num_orgs do
    Organization.create( 
                        name:           Faker::Company.name, 
                        description:    Faker::Lorem.paragraph,
                        url:            Faker::Internet.url,
                        visible:        Faker::Boolean.boolean(0.8),
                        category:       Faker::Lorem.word,
                        address_line_1: Faker::Address.street_address,
                        address_line_2: Faker::Address.secondary_address,
                        city:           Faker::Address.city,
                        state:          Faker::Address.state_abbr,
                        postal_code:    Faker::Address.postcode,
                        country:        Faker::Address.country
    )
  end
end

def create_programs(num_programs)
  for i in 1..num_programs do
    Program.create( 
                   name:        "#{Faker::Lorem.word.capitalize} Club",
                   description: Faker::Lorem.paragraph,
                   url:         Faker::Internet.url,
                   visible:     Faker::Boolean.boolean(0.8)
    )
  end
end

def create_experiences() 
  for i in 1..NUM_USERS do
    # randomly create an experience record for either program or organization
    # 1) 
    if Faker::Boolean.boolean
      Program.create( 
                     user_id:         i,
                     organization_id: Faker::Number.between(1, NUM_ORGS),
                     start_date:      Faker::,
                     end_date:        Faker::,
                     title:           Faker::,
                     award:           Faker::,
      )
    else
      Program.create( 
                     user_id:         i,
                     program_id:      Faker::,
                     start_date:      Faker::,
                     end_date:        Faker::,
                     title:           Faker::,
                     award:           Faker::,
      )
    end
  end
end

create_users(NUM_USERS)
create_organizations(NUM_ORGS)
create_programs(NUM_PROGS)
