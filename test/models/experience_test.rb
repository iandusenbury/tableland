require 'test_helper'

class ExperienceTest < ActiveSupport::TestCase
  
  def setup
    @experience = experiences(:natsumi_intel)
  end

  test "should be valid" do
    assert @experience.valid?, "Initial experience is not valid"
  end

  test "required fields should be present" do
    nil_required_field(@experience, :user_id)
    nil_required_field(@experience, :start_date)
    nil_required_field(@experience, :title)
  end

end
