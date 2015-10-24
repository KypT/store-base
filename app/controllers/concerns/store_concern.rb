module StoreConcern
  extend ActiveSupport::Concern

  included do
    layout :pick_layout
    before_action :init
  end

  def pick_layout
    request.xhr? ? false : 'store'
  end

  def init
    @tags = Tag.select {|t| t.special == nil} unless request.xhr?
    @products = Product.all
  end
end