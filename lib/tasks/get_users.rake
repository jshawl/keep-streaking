require 'json'
require 'rest-client'
require 'date'

desc "Get Users"
task :get_users => :environment do
  @users = User.all
  today = Date.today.to_s
  yesterday = Date.yesterday.to_s

  @users.each do |u|
    puts "****"
    url = "https://github.com/users/"+ u[:name] +"/contributions_calendar_data"
    streak = 0
    response = JSON.load(RestClient.get( url ))
    response.reverse!
    has_contributed = response[0][1]
    response.shift # don't count today

    response.each do |r|
      break if r[1] == 0 # no contirbutions :(
      streak += 1
    end

    @s = Streak.find_by_user_id( u[:id] ) || Streak.new 
    @s.user_id = u[:id]
    @s.streak = streak
    @s.save

    if has_contributed == 0
      if u.setting && u.setting.reminders
	puts 'email '+ u[:name]
	@u = User.find_by(:name => u[:name])
	puts @u.streak.streak
	UserMailer.send_email( @u ).deliver!
      end
    end
  end
end

task :get_streaks => :environment do
  @users = User.all
  today = Date.today.to_s
  yesterday = Date.yesterday.to_s

  @users.each do |u|
    puts "****"
    url = "https://github.com/users/"+ u[:name] +"/contributions_calendar_data"
    puts url
    streak = 0
    response = JSON.load(RestClient.get( url ))
    response.reverse!
    has_contributed = response[0][1]
    response.shift # don't count today

    response.each do |r|
      break if r[1] == 0 # no contirbutions :(
      streak += 1
    end

    @s = Streak.find_by_user_id( u[:id] ) || Streak.new 
    @s.user_id = u[:id]
    @s.streak = streak
    puts streak
    @s.save
  end
end
