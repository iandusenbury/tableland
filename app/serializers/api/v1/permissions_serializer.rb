module Api::V1
  class PermissionsSerializer < ActiveModel::Serializer
    # Root key
    type :permissions

    # If the user is the super_admin, they should see all organizations and programs
    attribute :organizations, if: -> { object.role == 'admin' }
    attribute :programs, if: -> { object.role == 'admin' }

    # Methods for custom attributes
    def organizations
      orgs = []
      Organization.all.each do |o|
        orgs.push(Api::V1::OrganizationSerializer.new(o, @instance_options).attributes)
      end
      orgs
    end
    def programs
      progs = []
      Program.all.each do |p|
        progs.push(Api::V1::ProgramSerializer.new(p, @instance_options).attributes)
      end
      progs
    end

    # Otherwise, if the user is an admin, they should see only their assigned permissions
    has_many :org_edits, key: :organizations, if: -> { object.role == 'user' }
    has_many :prog_edits, key: :programs, if: -> { object.role == 'user' }
  end
end