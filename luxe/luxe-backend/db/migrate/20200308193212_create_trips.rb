class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.integer :user_id
      t.integer :price
      t.integer :ship_id
      t.integer :location_id
      t.timestamps
    end
  end
end
