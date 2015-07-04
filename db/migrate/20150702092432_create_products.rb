class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.decimal :price, precision: 9, scale: 2
      t.string :name, default: ''
      t.text :description, default: ''
      t.timestamps null: false
    end
  end
end
