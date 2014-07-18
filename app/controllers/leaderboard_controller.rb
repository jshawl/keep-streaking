class LeaderboardController < ApplicationController
  def index
    @streaks = Streak.leaderboard
    @settings = Setting.all
    @setting = current_user ? current_user.setting : Setting.new
  end
end
