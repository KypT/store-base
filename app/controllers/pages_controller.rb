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

  def specials
    @specials = Special.all
  end
end
