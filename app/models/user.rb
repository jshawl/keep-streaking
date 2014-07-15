class User < ActiveRecord::Base
  has_one :setting
  def self.create_with_omniauth(auth)
      create! do |user|
	user.provider = auth["provider"]
	user.uid = auth["uid"]
	user.name = auth["extra"]['raw_info']['login']
      end
  end
  def self.settings
    @users = User.all
    @settings = []
    @users.each do |u|
      @user = {}
      @user[:name] = User.find( u.id ).name
      @user[:reminders] = u.setting.reminders
      @settings << @user
    end
    @settings
  end
end
