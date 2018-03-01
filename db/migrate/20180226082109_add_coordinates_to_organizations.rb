class AddCoordinatesToOrganizations < ActiveRecord::Migration[5.1]
  def change
    add_column :organizations, :lat, :decimal, precision: 8, scale: 6
    add_column :organizations, :lng, :decimal, precision: 9, scale: 6
  end
end
