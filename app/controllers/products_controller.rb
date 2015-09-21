class ProductsController < ApplicationController
  before_action :set_product, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:new, :update, :destroy]

  def hot
    @collection = Category.first
    @products = Product.limit(4)
    @special = Special.first
  end

  def new
    @product = Product.default
    redirect_to @product
  end

  def update
    begin
      add_images
      render nothing: true
      return
    end if params[:images]

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

  def add_images
    images = params[:images].map { |img| Image.create file: img }
    @product.images << images
  end

  def product_params
    params.permit(:name, :price, :description, :stock)
  end
end