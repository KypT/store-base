class AddImagesToSpecials < ActiveRecord::Migration
  def change
    add_reference :specials, :imageable, polymorphic: true, index: true
  end
end
