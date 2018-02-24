require 'test_helper'

module Api::V1
  class MediaControllerTest < ActionDispatch::IntegrationTest
    setup do
      @medium = media(:video)
      @user = users(:natsumi)
    end

    # TODO: Improve existing tests to be polymorphic

    # test "should get index" do
    #   get v1_media_url, as: :json
    #   assert_response :success
    # end

    test "should create medium" do
      assert_difference('Medium.count') do
        post v1_user_media_url(@user), params: { medium: { category: @medium.category, description: @medium.description, mediable_id: @medium.mediable_id, mediable_type: @medium.mediable_type, url: @medium.url } }, as: :json
      end

      assert_response 201
    end

    # test "should show medium" do
    #   get v1_medium_url(@medium), as: :json
    #   assert_response :success
    # end

    test "should update medium" do
      patch v1_user_medium_url(@user, @medium), params: { medium: { category: @medium.category, description: @medium.description, mediable_id: @medium.mediable_id, mediable_type: @medium.mediable_type, url: @medium.url } }, as: :json
      assert_response 200
    end

    test "should destroy medium" do
      assert_difference('Medium.count', -1) do
        delete v1_user_medium_url(@user, @medium), as: :json
      end

      assert_response 204
    end
  end
end
