class Special < ActiveRecord::Base
  validates_presence_of :title, :description
  has_one :image, as: :imageable, dependent: :destroy
end
