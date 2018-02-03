require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "minitest/reporters"
Minitest::Reporters.use!

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def nil_required_field(model, required_field)
    model[required_field] = nil
    assert_not model.valid?, "#{required_field} is required"
    model.reload
    assert model.valid?, "Reload did not work for #{required_field}"
  end

  def trigger_media_destroy(model)
    model_name = model.class.name
    if model.media.empty? # if the fixtures are modified, this is a fail safe
      model.media.create!(category:"video", description:"new vid")
    end
    assert_not model.media.empty?, "The #{model_name} is not associated with any media before the destroy"
    
    size = model.media.size
    assert_difference 'Medium.count', -size, "Destroying the #{model_name} did not remove their media from the database" do
      model.destroy
    end
    
    assert model.media.empty?, "Destroying the #{model_name} did not dissociate their media"
  end
end
