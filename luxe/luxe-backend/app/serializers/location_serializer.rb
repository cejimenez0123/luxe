class LocationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :price

  def to_serialized_json

  end
end
