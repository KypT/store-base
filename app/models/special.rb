class Special < ActiveRecord::Base
  validates_presence_of :title, :description
  has_one :image, as: :imageable, dependent: :destroy
  has_one :tag, dependent: :destroy
  after_create :create_tag

  def create_tag
    self.tag = Tag.create name: self.title
  end
end