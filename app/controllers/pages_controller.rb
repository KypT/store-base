class PagesController < ApplicationController
  layout 'application'

  def root
    @products = Product.all
  end

  def payment
  end

  def uniq
  end

  def specials
    @specials = Special.all
  end
end
