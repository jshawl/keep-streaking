class CreateStreaks < ActiveRecord::Migration
  def change
    create_table :streaks do |t|
      t.integer :streak
      t.belongs_to :user

      t.timestamps
    end
  end
end
