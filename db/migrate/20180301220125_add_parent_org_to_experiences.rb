class AddParentOrgToExperiences < ActiveRecord::Migration[5.1]
  def change
    add_column :experiences, :parent_org, :integer
  end
end
