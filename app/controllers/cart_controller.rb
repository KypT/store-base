class CartController < ApplicationController
  before_action :find_product, only: [:new, :destroy]
  before_action :get_cart

  def index
    @products = @cart.products
  end

  def new
    @cart.put @product
    render layout: false
  end

  def destroy
    @cart.remove @product
    render layout: false
  end

  def checkout
    redirect_to action: :index and return if @cart.products.empty?
    @cart.checkout
  end

  private
  def get_cart
    @cart = SessionCart.new session
  end

  def find_product
    id = params[:id].to_i
    @product = Product.find id
  end
end
