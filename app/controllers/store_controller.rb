class StoreController < ApplicationController
  include StoreConcern
  before_action :authenticate_admin!, only: [:new]

  def new
    @product = Product.default
    @product.save
    @new_product = true
    render controller: 'store', action: 'index'
  end

  def index
    @limit = 12
    @product = Product.find(params[:product_id]) if params[:product_id]
    @tag = Tag.find_by_name(params[:tag]) if params[:tag]
    @products = @tag ? @tag.products : Product.all.take(@limit)
    @tab = 'tags'
  end

  def get
    tags = (params[:tags] || []).map(&:to_i)
    category = Category.find_by_id params[:category]
    offset = params[:offset].to_i || 0
    limit = params[:limit].to_i || 100
    @page = offset / limit

    @products = (category ? category.products : Product.all).includes :images
    @products = tagged_with(@products, tags).sort[offset, limit]
    if params[:stocked] == 'true' and not @products.nil?
      @products = @products.select { |p| p.stock > 0 }
    end
    render nothing: true and return until @products
    render layout: false
  end

  private
  def tagged_with(products, tags)
    return products if tags.empty?
    products.select do |product|
      product if tags - product.tags.map(&:id) == []
    end
  end
end
