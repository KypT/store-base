class PagesController < ApplicationController
  layout 'headered'

  def root
    @products = Product.order(created_at: :desc).limit 10
    @reviews = Review.order(created_at: :desc).limit 5
    render layout: 'application'
  end

  def payment
  end

  def uniq
  end

  def about
  end

  def make_uniq
    @personal_order = PersonalOrder.new personal_order_params
    if @personal_order.save
      save_order_images
      session[:personalOrder] = @personal_order.id
      @personal_order.save
      redirect_to new_order_path
    end
  end

  def specials
    @specials = Special.all
  end

  def sitemap
    @tags = Tag.all
    @collections = Category.all
    @specials = Special.all
    @products = Product.all
    @articles = Article.all
    render layout: false
  end

  private
  def save_order_images
    images = params[:images]
    return if images.nil?

    images.each do | file |
      image = @personal_order.images.build
      image.update file: file
    end
  end

  def personal_order_params
    params.require(:personal).permit(:comment)
  end
end
