class CreateUserData < ActiveRecord::Migration
  def change
    create_table :user_data do |t|
      t.string :name
      t.string :surname
      t.string :fname
      t.string :phone
      t.string :vk
      t.string :skype
      t.string :country
      t.string :city
      t.string :address
      t.string :index
      t.text   :about
      t.string :group
      t.references :user
      t.timestamps null: false
    end
  end
end
