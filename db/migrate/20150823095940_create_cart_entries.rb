class CreateCartEntries < ActiveRecord::Migration
  def change
    create_table :cart_entries do |t|
      t.belongs_to :product, index: true
      t.belongs_to :order, index: true
      t.integer :amount
      t.text :comment
      t.timestamps null: true
    end
  end
end
