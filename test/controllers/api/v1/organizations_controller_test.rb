require 'test_helper'

module Api::V1
  class OrganizationsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @organization = organizations(:intel)
    end

    # TODO: Improve existing tests and add test for grant_permission and admins

    test "should get index" do
      get v1_organizations_url, as: :json
      assert_response :success
    end

    test "should create organization" do
      assert_difference('Organization.count') do
        post v1_organizations_url, params: { organization: { address_line_1: @organization.address_line_1, address_line_2: @organization.address_line_2, address_line_3: @organization.address_line_3, category: @organization.category, city: @organization.city, country: @organization.country, description: @organization.description, name: @organization.name, postal_code: @organization.postal_code, state: @organization.state, url: @organization.url, visible: @organization.visible } }, as: :json
      end

      assert_response 201
    end

    test "should show organization" do
      get v1_organization_url(@organization), as: :json
      assert_response :success
    end

    test "should update organization" do
      patch v1_organization_url(@organization), params: { organization: { address_line_1: @organization.address_line_1, address_line_2: @organization.address_line_2, address_line_3: @organization.address_line_3, category: @organization.category, city: @organization.city, country: @organization.country, description: @organization.description, name: @organization.name, postal_code: @organization.postal_code, state: @organization.state, url: @organization.url, visible: @organization.visible } }, as: :json
      assert_response 200
    end

    # test "should destroy organization" do
    #   assert_difference('Organization.count', -1) do
    #     delete v1_organization_url(@organization), as: :json
    #   end

    #   assert_response 204
    # end
  end
end
