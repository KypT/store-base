class Tag < ActiveRecord::Base
  has_and_belongs_to_many :products
  has_one :special
  validates_uniqueness_of :name

  def self.cleanup
    Tag.find_each do | tag |
      tag.destroy if tag.products.empty? and tag.special == nil
    end
  end
end