class AddTypeToCartEntries < ActiveRecord::Migration
  def change
    add_column :cart_entries, :order_type, :string
  end
end
