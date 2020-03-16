class TripsController < ApplicationController
    def index
        trips = Trip.all
        render json: TripSerializer.new(trips)
    end
    def create
  
        trip = Trip.create(user_id: params["user_id"], price: params["price"],ship_id: params["ship_id"], location_id: params["location_id"])
        render json: TripSerializer.new(trip)
    end
    def show
        trip = Trip.find_by(id: params[:id])
        render json: TripSerializer.new(trip)
    end
end
