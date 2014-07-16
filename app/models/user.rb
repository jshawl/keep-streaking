class User < ActiveRecord::Base
  has_one :setting
  has_one :streak

  def self.create_with_omniauth(auth)
      create! do |user|
        user.email = auth["extra"]["raw_info"]["email"]
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
      @user[:reminders] = u.setting ? u.setting.reminders : false
      @user[:id] = u.id
      @settings << @user if @user[:reminders]
    end
    @settings
  end
end
