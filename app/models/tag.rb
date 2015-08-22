class Tag < ActiveRecord::Base
  has_and_belongs_to_many :products
  validates_uniqueness_of :name

  def cleanup
    Tag.find_each do | tag |
      tag.destroy if tag.products.empty?
    end
  end
end
