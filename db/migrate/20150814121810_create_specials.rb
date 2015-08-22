class CreateSpecials < ActiveRecord::Migration
  def change
    create_table :specials do |t|
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
