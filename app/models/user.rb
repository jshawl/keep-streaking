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
      puts u.id.inspect
      @user[:name] = User.find( 1 ).name
      @user[:reminders] = u.setting.reminders
      @settings << @user
    end
    @settings
  end
end
