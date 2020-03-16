class SessionController < ApplicationController
    def create
     
        user = User.find_by(username: params["username"],password: params["password"])
        render json: UserSerializer.new(user)
    end
end
