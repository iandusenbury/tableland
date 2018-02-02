require 'test_helper'

class MediumTest < ActiveSupport::TestCase
  
  def setup
    @medium = media(:video)
  end

  test "should be valid" do
    assert @medium.valid?, "Initial medium is not valid"
  end

  test "required fields should be present" do
    nil_required_field(@medium, :mediable_id)
    nil_required_field(@medium, :mediable_type)
  end

end
