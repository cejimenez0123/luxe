class Trip < ApplicationRecord
    belongs_to :location
    belongs_to :ship
    belongs_to :user
end
