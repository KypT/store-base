class OrdersController < ApplicationController
  before_action :authenticate_user!, except: [:create, :new]

  def new
    redirect_to store_path if @cart.count == 0
    @order = @cart.make_order
  end

  def create
    @order = @cart.make_order
    @user_data = UserData.create user_params
    @order.user_data = @user_data
    alert 'Alert: Could not create order', @order.errors and redirect_to new_order_path unless @order.save
    session[:user_data_id] =  @user_data.id
    session[:user_email] = params[:email]
    @cart.clear
  end

  def index
    redirect_to profile_path unless admin_signed_in?
    @orders = Order.all
  end

  def show
    @order = Order.find(params[:id])
  end

  def destroy
    Order.find(params[:id]).destroy
    redirect_to controller: :orders,  action: :index
  end

  private
  def user_params
    params.require(:user_data).permit(:name, :surname, :fname, :phone, :skype, :vk, :country, :city, :address, :index, :about)
  end
end
