class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    @tags = Tag.all
    @tag = @tags.find_by name: params[:tag]
    if @tag
      @products = @tag.products
    else
      @products = Product.all
    end
  end

  def show
  end

  def new
    @product = Product.default
    redirect_to @product
  end

  def update
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

  def product_params
    params.permit(:name, :price)
  end
end
