class CreatePrograms < ActiveRecord::Migration[5.1]
  def change
    create_table :programs do |t|
      t.string :name
      t.text :description
      t.string :url
      t.boolean :visible

      t.timestamps
    end
  end
end
