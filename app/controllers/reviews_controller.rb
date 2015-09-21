class ReviewsController < ApplicationController
  def index
    @reviews = Review.all
  end

  def create
    @review = Review.create params[:review].permit :author, :review

    if params[:image]
      @review.image = Image.create params[:image].permit :file
    end

    redirect_to action: :index
  end

  def destroy
  end
end
