class UsersController < ApplicationController
    def index
      @users = User.all().length
      @topstreak = Streak.top_streak
      redirect_to '/leaderboard' if current_user
    end
end
