class ProductsController < ApplicationController
  before_action :set_product, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:update, :destroy]

  def get
    @product = Product.find params[:id]
  end

  def show
    redirect_to store_path
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
    print product_params[:description]
    render nothing: true
  end

  def destroy
    @product.destroy
    redirect_to products_path
  end

  def delete_image
    @id = params[:id]
    Image.destroy(@id)
  end

  def reorder_images
    counter = 0
    params[:order].each do | image_id |
      Image.find(image_id).update(order: counter)
      counter += 1
    end
    render nothing: true
  end

  private
  def set_product
    @product = Product.find(params[:id])
  end

  def update_tags
    @product.tags.clear
    params[:tags].each do | tag_name |
      tag = Tag.find_by_name(tag_name) || Tag.create(name: tag_name)
      @product.tags << tag
    end if params[:tags].length > 0
    Tag.cleanup
  end

  def update_category
      @product.category = Category.find_by_name params[:category]
      @product.save
  end

  def add_images
    params[:images].each do | file |
      image = @product.images.build
      image.update file: file
      errors = image.errors
    end
    @product.save
  end

  def product_params
    params.permit(:name, :price, :description, :stock)
  end
end