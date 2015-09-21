module StoreConcern
  extend ActiveSupport::Concern

  included do
    layout :pick_layout
    before_action :init, only: [:index, :show]
  end

  def pick_layout
    request.xhr? ? false : 'store'
  end

  def init
    @tags = Tag.all unless request.xhr?
    @products = Product.all
  end
end