class Article < ActiveRecord::Base
  validates_presence_of :title, :content

  def url_title
    self.title.gsub ' ', '_'
  end
end
