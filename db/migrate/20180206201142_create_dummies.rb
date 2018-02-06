class CreateDummies < ActiveRecord::Migration[5.1]
  def change
    create_table :dummies do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :current_occupation

      t.timestamps
    end
  end
end
