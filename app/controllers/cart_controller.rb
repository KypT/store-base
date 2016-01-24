class CartController < ApplicationController
  before_action :find_product, only: [:new, :destroy]

  def index
    @products = @cart.products
  end

  def new
    @type = params[:type]
    @amount = params[:amount].to_i

    if @cart.include? @product, @type
      @action = 'update'
      @cart.update @product, @type, @amount
    else
      @action = 'put'
      @cart.put @product, @type, @amount
    end

    @total = @cart.total
    render layout: false
  end

  def destroy
    @type = params[:type]
    @cart.remove @product, @type
    @total = @cart.total
    render layout: false
  end

  def checkout
    redirect_to action: :index and return if @cart.products.empty?
    @cart.checkout
  end

  private
  def find_product
    id = params[:id].to_i
    @product = Product.find id
  end

  def calculate_total
    @total = @cart.total
  end
end
