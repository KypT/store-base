class AddTagToSpecial < ActiveRecord::Migration
  def change
    change_table :specials do |t|
      t.references :tag
    end
  end
end
