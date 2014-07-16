require 'json'
require 'rest-client'
require 'date'

desc "Get Users"
task :get_users => :environment do
  @users = User.settings
  today = Date.today.to_s


  @users.each do |u|
    puts "****"
    url = "https://github.com/users/"+ u[:name] +"/contributions_calendar_data"
    streak = 0
    response = JSON.load(RestClient.get( url ))
    response.reverse!
    break if response[0][0] != today
    response.each do |r|
      break if r[1] == 0 # no contirbutions :(
      streak += 1
    end
    @s = Streak.find_by_user_id( u[:id] ) || Streak.new 
    @s.user_id = u[:id]
    @s.streak = streak
    @s.save
    puts "didn't return"
    has_contributed = response[-1][-1]
    has_contributed = 0
    if has_contributed == 0
      puts 'email '+ u[:name]
      #puts u.inspect
      @u = User.find_by(:name => u[:name])
      puts @u.streak.streak
      UserMailer.send_email( @u ).deliver!
    end
  end
end
