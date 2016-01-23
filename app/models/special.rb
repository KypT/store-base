class Special < ActiveRecord::Base
  validates_presence_of :title, :description
  has_one :image, as: :imageable, dependent: :destroy
  has_one :tag, dependent: :destroy
  after_create :create_tag
  after_update :update_tag

  def create_tag
    self.tag = Tag.create name: self.title
  end

  def update_tag
    self.tag.update name: self.title if self.taggit
  end

  def url_title
    self.title.gsub ' ', '_'
  end
end