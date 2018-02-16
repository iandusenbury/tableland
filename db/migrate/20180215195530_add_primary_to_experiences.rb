class AddPrimaryToExperiences < ActiveRecord::Migration[5.1]
  def change
    add_column :experiences, :primary, :boolean
  end
end
