class AddSpecialToTags < ActiveRecord::Migration
  def change
    add_reference :tags, :special
  end
end
