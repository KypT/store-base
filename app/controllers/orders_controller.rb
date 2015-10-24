class OrdersController < ApplicationController
  before_action :authenticate_user!, except: [:create, :new]

  def new
    @order = @cart.make_order
  end

  def create
    @order = @cart.make_order
    @order.update order_params
    @cart.clear
  end

  def index
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
  def order_params
    params.require(:order).permit(:name, :surname, :phone, :email, :country, :city, :address, :post_code)
  end
end
