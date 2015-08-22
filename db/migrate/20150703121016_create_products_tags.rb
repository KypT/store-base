class CreateProductsTags < ActiveRecord::Migration
  def change
    create_table :products_tags do |t|
      t.belongs_to :product, catalog: true
      t.belongs_to :tag, catalog: true
    end
  end
end