require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


8.times do
    name = Faker::Movies::HitchhikersGuideToTheGalaxy.planet
    price = rand(900..1300)
    locale = Location.create(name: name, price: price)
end
8.times do
    name = Faker::Movies::HitchhikersGuideToTheGalaxy.starship
    price = rand(300..950)
    ship = Ship.create(name: name, price: price)
end
# new_ships = []
# old_ships=["Blue","Cussler","Moby Dick","Nackatomi","Altair","Caine"]
# ship_prices = [400,600,350,700,500,550,650].each
# old_ships.each do |ship|
#     price = ship_prices.next
#     x = Ship.create(name: "S.S. #{Faker::Name.first_name}" ,price: price)
#     new_ships << x
# end
# old_locations=["Erydan","Typon","Mercury","Mars","Venus"]
# new_locations=[]
# location_prices = [ 1200, 900, 1100,1050,1000,900,875,1250].each
# old_locations.each do |location|
#     price = location_prices.next
#      x = Location.create(name: location, price: price)
#     new_locations << x
# end
#  ship_enum = new_ships.each
#  location_enum = new_locations.each 
 
# trip_name =["Bonanza Cruise","Space Whale Watching","Star Search","Red Beach"]
# new_trip = [] 
# trip_name.each do |name|  
#      a = ship_enum.next
#      b = location_enum.next
     
#      trip = Trip.create(name: name, ship_id: a.id, location_id: b.id)
#     new_trip << trip
#     end


