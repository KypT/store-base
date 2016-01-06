class CreatePersonalOrders < ActiveRecord::Migration
  def change
    create_table :personal_orders do |t|
      t.text :comment
      t.references :imageable, polymorphic: true, index: true
      t.references :order

      t.timestamps null: false
    end
  end
end
