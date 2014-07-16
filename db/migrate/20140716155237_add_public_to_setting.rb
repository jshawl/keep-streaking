class AddPublicToSetting < ActiveRecord::Migration
  def change
    add_column :settings, :public, :boolean
  end
end
