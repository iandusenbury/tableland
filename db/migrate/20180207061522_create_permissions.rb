class CreatePermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :permissions do |t|
      t.belongs_to :user, index: true
      t.belongs_to :organization, index: true
      t.belongs_to :program, index: true

      t.timestamps
    end
  end
end
