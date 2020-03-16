class Ship < ApplicationRecord
    has_many :trips
    has_many :locations, through: :trip
end
