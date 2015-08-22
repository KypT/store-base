class Product < ActiveRecord::Base
  extend FriendlyId

  validates_presence_of :name, :price
  validates_uniqueness_of :name

  friendly_id :name, use: I18n
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :orders
  has_many :images, as: :imageable, dependent: :destroy
  belongs_to :category

  def self.default
    Product.create name: 'Назови меня', price: 0
  end

  def <=>(this)
    self.created_at <=> this.created_at
  end
end