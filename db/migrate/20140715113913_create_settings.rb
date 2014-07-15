class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.boolean :reminders
      t.belongs_to :user

      t.timestamps
    end
  end
end
