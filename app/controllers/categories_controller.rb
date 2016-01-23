class CategoriesController < ApplicationController
  include StoreConcern
  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def index
    @collections = Category.all
    @tab = 'collections'
  end

  def show
    @id = params[:category_id].to_i
    @category = Category.find(@id)
    @tab = 'collections'
  end

  def new
    @category = Category.create name: 'Коллекция', description: 'Описание'
    redirect_to category_collection_path(@category.id, @category.url_name)
  end

  def update
    add_image if params[:image]
    @category.update(category_params)
    @category.image = Image.create file: params[:images][0] if params[:images]
    render nothing: true
  end

  def destroy
    @category.destroy
    redirect_to categories_url, notice: 'Category was successfully destroyed.'
  end

  private
  def add_image
    @category.image = Image.new(file: params[:image])
  end

  def set_category
    @category = Category.find(params[:category_id])
  end

  def category_params
    params.permit(:name, :description)
  end
end
