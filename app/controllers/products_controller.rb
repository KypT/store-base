class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :update, :destroy]

  def index
    @tags = Tag.all
    @collections = Category.all
    render partial: 'products/store', layout: false if request.xhr?
  end

  def hot
    @collection = Category.first
    @products = Product.all
    @special = Special.first
  end

  def show
  end

  def get
    tags = (params[:tags] || []).map(&:to_i)
    category = Category.find_by_id params[:category]
    offset = params[:offset].to_i || 0
    limit = params[:limit].to_i || 8
    @page = offset / limit

    @products = (category ? category.products : Product.all).includes :images
    @products = tagged_with(@products, tags).sort[offset, limit]
    render nothing: true and return until @products
    render layout: false
  end

  def new
    @product = Product.default
    redirect_to @product
  end

  def update
    begin
      add_image
      redirect_to product_path(@product)
      return
    end if params[:image]

    update_tags if params[:tags]
    update_category if params[:category]
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
    Tag.cleanup
  end

  def update_category
    category = Category.find_by_name params[:category]
    category = Category.create name: params[:category] unless category
    @product.category = category
    @product.save
    Category.cleanup
  end

  def add_image
    @product.images.destroy_all
    @product.images << Image.create(file: params[:image])
  end

  def product_params
    params.permit(:name, :price, :description)
  end

  def tagged_with(products, tags)
    return products if tags.empty?
    products.select do | product |
      product if tags - product.tags.map(&:id) == []
    end
  end
end