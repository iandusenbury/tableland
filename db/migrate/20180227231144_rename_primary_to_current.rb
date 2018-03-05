class RenamePrimaryToCurrent < ActiveRecord::Migration[5.1]
  def change
    rename_column :experiences, :primary, :current
  end
end
