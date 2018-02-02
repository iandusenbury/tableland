class CreateMedia < ActiveRecord::Migration[5.1]
  def change
    create_table :media do |t|
      t.integer :mediable_id
      t.string :mediable_type
      t.string :category
      t.text :description
      t.string :url

      t.timestamps
    end

    add_index :media, [:mediable_type, :mediable_id]
  
  end
end
