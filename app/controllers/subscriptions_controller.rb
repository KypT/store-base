class SubscriptionsController < ApplicationController
  def new
    if Subscription.create email: params[:email]
      render json: {result: :ok}
    else
      render json: {result: :fail}
    end
  end
end
