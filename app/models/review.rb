class Review < ActiveRecord::Base
  validates_presence_of :author, :review

  has_one :image, as: :imageable, dependent: :destroy
end
