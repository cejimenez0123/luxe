class ShipSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name,:price
end
