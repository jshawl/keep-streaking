class UsersController < ApplicationController
    def new
    end
    def index
      @users = User.settings()
      render json: @users
    end
end
