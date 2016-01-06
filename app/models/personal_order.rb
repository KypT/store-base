class PersonalOrder < ActiveRecord::Base
  validates_presence_of :comment

  has_many :images, as: :imageable, dependent: :destroy
  belongs_to :order
end
