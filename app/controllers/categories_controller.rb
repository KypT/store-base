class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def index
    @categories = Category.all
  end

  def show
    @id = params[:id].to_i
    @categories = Category.order(:id).reject { |cat| cat.id <= @id }
    @category = @categories.empty? ? Category.order(:id).first : @categories.first
    render :layout => false
  end

  def new
    @category = Category.new
  end

  def edit
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      redirect_to categories_path, notice: 'Category was successfully created.'
    else
      render :new
    end
  end

  def update
    add_image if params[:image]
    if @category.update(category_params)
      render :edit, notice: 'Category was successfully updated.'
    else
      render :edit
    end
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
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit([:name, :description])
  end
end
