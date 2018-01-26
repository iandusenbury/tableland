class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :linkedin_id
      t.string :contact_url
      t.boolean :visible
      t.string :role

      t.timestamps
    end
  end
end
