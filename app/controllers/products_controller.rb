class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :update, :destroy]

  def index
    @tags = Tag.all
  end

  def show
  end

  def get
    tags = params[:tags] || []
    offset = params[:offset].to_i || 0
    limit = params[:limit].to_i || 8

    @products = products_with(tags).sort[offset, limit]
    render nothing: true and return until @products
    render layout: false
  end

  def new
    @product = Product.default
    redirect_to @product
  end

  def update
    add_image if params[:image]
    update_tags if params[:tags]
    @product.update(product_params)
    render nothing: true
  end

  def destroy
    @product.destroy
    redirect_to products_path
  end

  private
  def set_product
    @product = Product.friendly.find(params[:id])
  end

  def update_tags
    @product.tags.clear
    params[:tags].split.each do | tag_name |
      tag = Tag.find_by_name(tag_name) || Tag.create(name: tag_name)
      @product.tags << tag
    end
    clear_tags
  end

  def clear_tags
    Tag.find_each do | tag |
      tag.destroy if tag.products.empty?
    end
  end

  def add_image
    @product.images.destroy_all
    @product.images << Image.create(file: params[:image])
  end

  def product_params
    params.permit(:name, :price)
  end

  def products_with(tags)
    return Product.all if tags.empty?
    first_tag = Tag.find_by_name tags.first
    products = first_tag.products
    return products if tags.length == 1
    tagged_products = []
    products.each do | product |
      if tags - product.tags.map(&:name) == []
        tagged_products << product
      end
    end
    tagged_products
  end
end