class Category < ActiveRecord::Base
  validates_uniqueness_of :name
  validates_presence_of :name
  has_one :image, as: :imageable, dependent: :destroy
  has_many :products

  def cleanup
    Category.find_each do | cat |
      cat.destroy if cat.products.empty?
    end
  end
end
