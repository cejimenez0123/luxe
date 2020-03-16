class ShipsController < ApplicationController
    def index
        ships = Ship.all
        
        render json: ShipSerializer.new(ships)
    end
    def show 
        ship = Ship.all.find_by(id: params[:id])
        render json: ship.to_json(except: [:updated_at,:created_at])
    end
end
