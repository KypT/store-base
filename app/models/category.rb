class Category < ActiveRecord::Base
  validates_uniqueness_of :name
  validates_presence_of :name
  has_one :image, as: :imageable, dependent: :destroy
  has_many :products

  def self.cleanup
    Category.find_each do | cat |
      cat.destroy if cat.products.empty?
    end
  end

  def to_param
    "#{id}/#{name}".html_safe
  end

  def url_name
    self.name.gsub ' ', '_'
  end
end
