class AddFieldsToOrder < ActiveRecord::Migration
  def change
    change_table :orders do | t |
      t.string :name
      t.string :surname
      t.string :phone
      t.string :email
      t.string :country
      t.string :city
      t.string :address
      t.string :post_code
    end
  end
end
