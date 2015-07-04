class Image < ActiveRecord::Base
  mount_uploader :file, ImageUploader
  validates_presence_of :product
  belongs_to :product
end