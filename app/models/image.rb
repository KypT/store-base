class Image < ActiveRecord::Base
  validates_presence_of :product
  belongs_to :product
end