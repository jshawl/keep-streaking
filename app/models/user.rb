class User < ActiveRecord::Base
  def self.create_with_omniauth(auth)
      puts auth.inspect
      create! do |user|
	user.provider = auth["provider"]
	user.uid = auth["uid"]
	user.name = auth["info"]["login"]
      end
  end
end
