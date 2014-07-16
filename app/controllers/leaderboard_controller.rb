class LeaderboardController < ApplicationController
  def index
    @streaks = Streak.leaderboard
  end
end
