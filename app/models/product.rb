class Product < ActiveRecord::Base
  extend FriendlyId

  validates_presence_of :name, :price
  validates_uniqueness_of :name

  friendly_id :name, use: I18n
  has_and_belongs_to_many :tags

  def self.default
    Product.create name: 'Назови меня', price: 0
  end
end