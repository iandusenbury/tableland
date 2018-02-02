class CreateExperiences < ActiveRecord::Migration[5.1]
  def change
    create_table :experiences do |t|
      t.belongs_to :user, index: true
      t.belongs_to :organization, index: true
      t.belongs_to :program, index: true
      t.datetime :start_date
      t.datetime :end_date
      t.string :title
      t.string :award

      t.timestamps
    end
  end
end
