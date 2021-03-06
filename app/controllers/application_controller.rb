class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :init_cart, :init_user
  layout :pick_layout

  def init_cart
    if session[:order].nil?
      @order = Order.create
      session[:order] = @order.id
    end

    @order = Order.find session[:order]
    @cart = DBCart.new @order
  end

  def authenticate_admin!
    not_found until admin_signed_in?
  end

  def admin_signed_in?
    current_user and current_user.admin?
  end

  def init_user
    @user_data = session[:user_data_id] ? UserData.find_by(id: session[:user_data_id]) : UserData.new
    @user_data = current_user.user_data if current_user
  end

  def alert(title, message = '')
    flash[:title] = title
    flash[:alert] = message
    logger.error message
  end

  def pick_layout
    request.xhr? ? false : 'headered'
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end