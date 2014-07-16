class UsersController < ApplicationController
    def index
      @users = User.all().length
    end
end
