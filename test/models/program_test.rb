require 'test_helper'

class ProgramTest < ActiveSupport::TestCase

  def setup
    @program = programs(:robotics)
  end

  test "should be valid" do
    assert @program.valid?, "Initial program is not valid"
  end

  test "required fields should be present" do
    nil_required_field(@program, :name)
    nil_required_field(@program, :visible)
  end

  test "upon destroy, should have its associated media destroyed" do
    trigger_media_destroy(@program)
  end

  test "can only become associated with a user through experiences" do
    user = users(:natsumi)
    organization = organizations(:nike)
    if user.nil? # if the fixtures are modified, this is a fail safe
      user = User.create!(first_name:"Natsumi", last_name:"Hirata", linkedin_id:123, contact_url:"example.example")
    end
    if organization.nil? # same as above
      organization = Organization.create!(name:"Nike", address_line_1:"392", address_line_2:"SE Road Ave.", city:"Portland", country:"USA")
    end

    assert_raises ActiveRecord::RecordInvalid do
      @program.experiences.create!(user_id:user.id, organization_id:organization.id, start_date:Time.now, title:"Wrong")
    end
    assert_difference 'Experience.count', 1, "Program could not associate with a user" do
      @program.experiences.create!(user_id:user.id, start_date:Time.now, title:"Right")    
    end
  end

  test "upon destroy, should have its associated experiences destroyed" do
    if @program.experiences.empty? # if the fixtures are modified, this is a fail safe
      user = users(:natsumi)
      if user.nil?
        user = User.create!(first_name:"Natsumi", last_name:"Hirata", linkedin_id:123, contact_url:"example.example")
      end
      user.experiences.create!(program_id:@program.id, start_date:Time.now, title:"Participant")
    end
    assert_not @program.experiences.empty?, "The program does not have any experiences before the destroy"

    size = @program.experiences.size
    assert_difference 'Experience.count', -size, "Destroying the program did not remove their experiences from the database" do
      @program.destroy
    end

    assert @program.experiences.empty?, "Destroying the program did not dissociate their experiences"
  end

  test "upon destroy, should have its associated sponsors destroyed" do
    if @program.sponsors.empty? # if the fixtures are modified, this is a fail safe
      @program.organizations.create!(name:"Nike", address_line_1:"392", address_line_2:"SE Road Ave.", city:"Portland", country:"USA")
    end
    assert_not @program.sponsors.empty?, "The program is not associated with any organizations before the destroy"
    
    size = @program.sponsors.size
    assert_difference 'Sponsor.count', -size, "Destroying the program did not remove their sponsors from the database" do
      @program.destroy
    end
    
    assert @program.sponsors.empty?, "Destroying the program did not dissociate their sponsors"
  end

end
