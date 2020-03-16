class UsersController < ApplicationController
    def create
        user = User.create(name: params["name"], username: params["username"],
        password: params["password"])
        render json: UserSerializer.new(user)
    end
    def index 
        users = User.all 
        render json: UserSerializer.new(users)
    end
    def show
        user = User.all.find_by(id: params[:id])
        render json: UserSerializer.new(user)
    end
    
end
