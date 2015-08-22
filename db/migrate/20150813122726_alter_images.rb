class AlterImages < ActiveRecord::Migration
  def change
    remove_column :images, :product_id
    add_reference :images, :imageable, polymorphic: true, index: true
  end
end
