require 'test_helper'

class OrganizationTest < ActiveSupport::TestCase
 
  def setup
    @organization = organizations(:intel)
  end

  test "should be valid" do
    assert @organization.valid?, "Initial organization is not valid"
  end

  test "required fields should be present" do
    nil_required_field(@organization, :name)
    nil_required_field(@organization, :visible)
    nil_required_field(@organization, :address_line_1)
    nil_required_field(@organization, :address_line_2)
    nil_required_field(@organization, :city)
    nil_required_field(@organization, :country)
  end

  test "upon destroy, should have its associated media destroyed" do
    trigger_media_destroy(@organization)
  end

  test "upon destroy, should have its associated experiences destroyed" do
    if @organization.experiences.empty? # if the fixtures are modified, this is a fail safe
      user = users(:evan)
      if user.nil?
        user = User.create!(first_name:"Evan", last_name:"White", linkedin_id:456, contact_url:"example.beef")
      end
      user.experiences.create!(organization_id:@organization.id, start_date:Time.now, title:"Engineer")
    end
    assert_not @organization.experiences.empty?, "The organization does not have any experiences before the destroy"

    size = @organization.experiences.size
    assert_difference 'Experience.count', -size, "Destroying the organization did not remove their experiences from the database" do
      @organization.destroy
    end

    assert @organization.experiences.empty?, "Destroying the organization did not dissociate their experiences"
  end

  test "upon destroy, should have its associated sponsors destroyed" do
    if @organization.sponsors.empty? # if the fixtures are modified, this is a fail safe
      @organization.programs.create!(name:"Science Club")
    end
    assert_not @organization.sponsors.empty?, "The organization is not associated with any programs before the destroy"
    
    size = @organization.sponsors.size
    assert_difference 'Sponsor.count', -size, "Destroying the organization did not remove their sponsors from the database" do
      @organization.destroy
    end
    
    assert @organization.sponsors.empty?, "Destroying the organization did not dissociate their sponsors"
  end

end
