require 'test_helper'

class ExperiencesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @experience = experiences(:natsumi_intel)
  end

  test "should get index" do
    get experiences_url, as: :json
    assert_response :success
  end

  test "should create experience" do
    assert_difference('Experience.count') do
      post experiences_url, params: { experience: { award: @experience.award, end_date: @experience.end_date, organization_id: @experience.organization_id, program_id: @experience.program_id, start_date: @experience.start_date, title: @experience.title, user_id: @experience.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show experience" do
    get experience_url(@experience), as: :json
    assert_response :success
  end

  test "should update experience" do
    patch experience_url(@experience), params: { experience: { award: @experience.award, end_date: @experience.end_date, organization_id: @experience.organization_id, program_id: @experience.program_id, start_date: @experience.start_date, title: @experience.title, user_id: @experience.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy experience" do
    assert_difference('Experience.count', -1) do
      delete experience_url(@experience), as: :json
    end

    assert_response 204
  end
end
