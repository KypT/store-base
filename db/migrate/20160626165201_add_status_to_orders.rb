class AddStatusToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :status, :String, default: 'created'
  end
end
