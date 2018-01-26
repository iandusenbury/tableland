class CreateOrganizationPrograms < ActiveRecord::Migration[5.1]
  def change
    create_table :organizations_programs, id: false do |t|
      t.belongs_to :organization, index: true
      t.belongs_to :program, index: true

      t.timestamps
    end
  end
end
