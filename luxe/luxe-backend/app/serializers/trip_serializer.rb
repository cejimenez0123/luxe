class TripSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id,:price,:user,:ship,:location
  belongs_to :location
  belongs_to :ship
  belongs_to :user
end
