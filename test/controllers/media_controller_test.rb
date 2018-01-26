require 'test_helper'

class MediaControllerTest < ActionDispatch::IntegrationTest
  setup do
    @medium = media(:one)
  end

  test "should get index" do
    get media_url, as: :json
    assert_response :success
  end

  test "should create medium" do
    assert_difference('Medium.count') do
      post media_url, params: { medium: { category: @medium.category, description: @medium.description, mediable_id: @medium.mediable_id, mediable_type: @medium.mediable_type, url: @medium.url } }, as: :json
    end

    assert_response 201
  end

  test "should show medium" do
    get medium_url(@medium), as: :json
    assert_response :success
  end

  test "should update medium" do
    patch medium_url(@medium), params: { medium: { category: @medium.category, description: @medium.description, mediable_id: @medium.mediable_id, mediable_type: @medium.mediable_type, url: @medium.url } }, as: :json
    assert_response 200
  end

  test "should destroy medium" do
    assert_difference('Medium.count', -1) do
      delete medium_url(@medium), as: :json
    end

    assert_response 204
  end
end
