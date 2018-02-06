require 'test_helper'

class DummiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @dummy = dummies(:one)
  end

  test "should get index" do
    get dummies_url, as: :json
    assert_response :success
  end

  test "should create dummy" do
    assert_difference('Dummy.count') do
      post dummies_url, params: { dummy: { current_occupation: @dummy.current_occupation, email: @dummy.email, first_name: @dummy.first_name, last_name: @dummy.last_name } }, as: :json
    end

    assert_response 201
  end

  test "should show dummy" do
    get dummy_url(@dummy), as: :json
    assert_response :success
  end

  test "should update dummy" do
    patch dummy_url(@dummy), params: { dummy: { current_occupation: @dummy.current_occupation, email: @dummy.email, first_name: @dummy.first_name, last_name: @dummy.last_name } }, as: :json
    assert_response 200
  end

  test "should destroy dummy" do
    assert_difference('Dummy.count', -1) do
      delete dummy_url(@dummy), as: :json
    end

    assert_response 204
  end
end
