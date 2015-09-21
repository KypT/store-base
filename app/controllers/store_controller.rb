class StoreController < ApplicationController
  include StoreConcern

  def index
    @product = Product.friendly.find(params[:name]) if params[:name]
    @products = Product.all
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
