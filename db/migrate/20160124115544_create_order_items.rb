class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items do |t|
      t.belongs_to :product, index: true
      t.belongs_to :order, index: true
      t.integer :buy_amount, default: 0
      t.integer :repeat_amount, default: 0
      t.text :comment
      t.timestamps null: true
    end
  end
end
