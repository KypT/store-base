class CartController < ApplicationController
  before_action :parse_id, only: [:new, :destroy]
  before_action :get_cart
  layout false

  def index
    @items = @cart.items
    render layout: 'application'
  end

  def new
    @cart.add @id
    render nothing: true
  end

  def destroy
    @cart.remove @id
  end

  def checkout
    redirect_to action: :index and return if @cart.items.empty?
    @cart.checkout
    render layout: 'application'
  end

  private
  def parse_id
    @id = params[:id].to_i
  end

  def get_cart
    @cart = Cart.new session
  end

end
