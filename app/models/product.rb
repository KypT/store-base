class Product < ActiveRecord::Base
  validates_presence_of :name, :price

  has_and_belongs_to_many :tags
  has_many :cart_entries
  has_many :orders, :through => :cart_entries
  has_many :images, as: :imageable, dependent: :destroy
  belongs_to :category

  def self.default
    Product.create name: 'Назови меня', price: 0, stock: 0
  end

  def to_param
    "#{id}/#{name}"
  end

  def url_name
    self.name.gsub ' ', '_'
  end

  def get_json
    self.to_json(:include => [:images, :category, {:tags => { :include =>  :special  } }]).html_safe
  end

  def <=>(this)
    self.created_at <=> this.created_at
  end
end