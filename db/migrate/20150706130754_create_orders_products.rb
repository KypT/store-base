class CreateOrdersProducts < ActiveRecord::Migration
  def change
    create_table :orders_products do |t|
      t.belongs_to :product
      t.belongs_to :order
    end
  end
end
