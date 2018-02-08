require 'test_helper'

class PermissionTest < ActiveSupport::TestCase
  
  def setup
    @permission = permissions(:natsumi_admin_intel)
  end

  test "should be valid" do
    assert @permission.valid?, "Initial permission is not valid"
  end

  test "required fields should be present" do
    nil_required_field(@permission, :user_id)
  end

end
