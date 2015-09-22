class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :author
      t.text :review
      t.references :imageable

      t.timestamps null: false
    end
  end
end
