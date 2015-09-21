class AddStockToProducts < ActiveRecord::Migration
  def change
    add_column :products, :stock, :Integer
  end
end
