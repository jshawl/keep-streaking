class LeaderboardController < ApplicationController
  def index
    @streaks = Streak.leaderboard
    @settings = Setting.all
    if current_user.setting
      @setting = current_user.setting 
    else
      @setting = Setting.new
    end
  end
end
