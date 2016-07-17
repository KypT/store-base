class ErrorsController < ApplicationController
  def show
    head :not_found
    render :not_found
  end

  def not_found
  end
end