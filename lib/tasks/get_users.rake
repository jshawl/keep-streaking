require 'json'
require 'rest-client'

desc "Get Users"
task :get_users => :environment do
  @users = User.settings
  @users.each do |u|
    url = "https://github.com/users/"+ u[:name] +"/contributions_calendar_data"
    response = JSON.load(RestClient.get( url ))
    has_contributed = response[-1][-1]
    if has_contributed != 0
      puts 'email '+ u[:name]
      puts u.inspect
      @u = User.find_by(:name => u[:name])
      UserMailer.send_email( @u ).deliver
    end
  end
end
