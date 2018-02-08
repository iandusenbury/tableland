require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = users(:natsumi)
  end

  test "should be valid" do
    assert @user.valid?, "Initial user is not valid"
  end

  test "required fields should be present" do
    nil_required_field(@user, :first_name)
    nil_required_field(@user, :last_name)
    nil_required_field(@user, :linkedin_id)
    nil_required_field(@user, :contact_url)
    nil_required_field(@user, :visible)
    nil_required_field(@user, :role)
  end

  test "upon destroy, should have its associated media destroyed" do
    trigger_media_destroy(@user)
  end

  test "should be allowed to associate with just an organization through one experience" do
    organization = organizations(:nike)
    if organization.nil? # if the fixtures are modified, this is a fail safe
      organization = Organization.create!(name:"Nike", visible:true, address_line_1:"392", address_line_2:"SE Road Ave.", city:"Portland", country:"USA")
    end

    assert_difference 'Experience.count', 1, "Association between user and organization through experiences failed" do
      @user.experiences.create!(organization_id:organization.id, start_date:Time.now, title:"Engineer")
    end
  end

  test "should be allowed to associate with just a program through one experience" do
    program = programs(:science)
    if program.nil? # if the fixtures are modified, this is a fail safe
      program = Program.create!(name:"Science Lab", visible:true)
    end

    assert_difference 'Experience.count', 1, "Association between user and program through experiences failed" do
      @user.experiences.create!(program_id:program.id, start_date:Time.now, title:"Scientist")
    end
  end

  test "should not become associated with both an organization and program through a single experience" do
    organization = organizations(:nike)
    if organization.nil? # if the fixtures are modified, this is a fail safe
      organization = Organization.create!(name:"Nike", visible:true, address_line_1:"392", address_line_2:"SE Road Ave.", city:"Portland", country:"USA")
    end

    program = programs(:science)
    if program.nil? # if the fixtures are modified, this is a fail safe
      program = Program.create!(name:"Science Lab", visible:true)
    end

    assert_raises ActiveRecord::RecordInvalid do
      @user.experiences.create!(organization_id:organization.id, program_id:program.id, start_date:Time.now, title:"Wrong")
    end
  end

  test "upon destroy, should have its associated experiences destroyed" do
    if @user.experiences.empty? # if the fixtures are modified, this is a fail safe
      program = Program.create!(name:"Science Lab", visible:true)
      @user.experiences.create!(program_id:program.id, start_date:Time.now, title:"Scientist")
    end
    assert_not @user.experiences.empty?, "The user does not have any experiences before the destroy"

    size = @user.experiences.size
    assert_difference 'Experience.count', -size, "Destroying the user did not remove their experiences from the database" do
      @user.destroy
    end

    assert @user.experiences.empty?, "Destroying the user did not dissociate their experiences"
  end

  test "should be allowed to associate with just an organization through one permission" do
    organization = organizations(:nike)
    if organization.nil? # if the fixtures are modified, this is a fail safe
      organization = Organization.create!(name:"Nike", visible:true, address_line_1:"392", address_line_2:"SE Road Ave.", city:"Portland", country:"USA")
    end

    assert_difference 'Permission.count', 1, "Association between user and organization through permissions failed" do
      @user.org_edits << organization
    end
  end

  test "should be allowed to associate with just a program through one permission" do
    program = programs(:science)
    if program.nil? # if the fixtures are modified, this is a fail safe
      program = Program.create!(name:"Science Lab", visible:true)
    end

    assert_difference 'Permission.count', 1, "Association between user and organization through permissions failed" do
      @user.prog_edits << program
    end
  end

  test "should not become associated with both an organization and program through a single permission" do
    organization = organizations(:nike)
    if organization.nil? # if the fixtures are modified, this is a fail safe
      organization = Organization.create!(name:"Nike", visible:true, address_line_1:"392", address_line_2:"SE Road Ave.", city:"Portland", country:"USA")
    end

    program = programs(:science)
    if program.nil? # if the fixtures are modified, this is a fail safe
      program = Program.create!(name:"Science Lab", visible:true)
    end

    assert_raises ActiveRecord::RecordInvalid do
      @user.permissions.create!(organization_id:organization.id, program_id:program.id)
    end
  end

end
