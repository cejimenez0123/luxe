class LocationsController < ApplicationController
    def index
        locations = Location.all
        
        render json: LocationSerializer.new(locations)
    end
    def show
        location = Location.all.find_by(id: params[:id])
        render json: location.to_json(except:[:updated_at,:created_at])
    end
end
