class AddUserDataToOrders < ActiveRecord::Migration
  def change
    add_reference :orders, :user_data
  end
end
