class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :init_cart
  layout :pick_layout

  def init_cart
    @cart = SessionCart.new session
  end

  def pick_layout
    request.xhr? ? false : 'headered'
  end
end