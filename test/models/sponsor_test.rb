require 'test_helper'

class SponsorTest < ActiveSupport::TestCase
  
  def setup
    @sponsor = sponsors(:mesa_robot)
  end

  test "should be valid" do
    assert @sponsor.valid?, "Initial sponsor is not valid"
  end

  test "required fields should be present" do
    nil_required_field(@sponsor, :organization_id)
    nil_required_field(@sponsor, :program_id)
  end

end
