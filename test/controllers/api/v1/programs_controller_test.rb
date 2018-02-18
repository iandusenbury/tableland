require 'test_helper'

module Api::V1
  class ProgramsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @program = programs(:robotics)
    end

    test "should get index" do
      get api_v1_programs_url, as: :json
      assert_response :success
    end

    test "should create program" do
      assert_difference('Program.count') do
        post api_v1_programs_url, params: { program: { description: @program.description, name: @program.name, url: @program.url, visible: @program.visible } }, as: :json
      end

      assert_response 201
    end

    test "should show program" do
      get api_v1_program_url(@program), as: :json
      assert_response :success
    end

    test "should update program" do
      patch api_v1_program_url(@program), params: { program: { description: @program.description, name: @program.name, url: @program.url, visible: @program.visible } }, as: :json
      assert_response 200
    end

    test "should destroy program" do
      assert_difference('Program.count', -1) do
        delete api_v1_program_url(@program), as: :json
      end

      assert_response 204
    end
  end
end
