class UsersController < ApplicationController
    def index
      @users = User.all().length
      @topstreak = Streak.top_streak
    end
end
