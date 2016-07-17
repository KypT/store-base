require 'active_support'

class OrdersController < ApplicationController
  include ProfileConcern

  before_action :authenticate_user!, except: [:create, :new]
  before_action :find_personal_order

  def new
    @order.personal_order = @personal_order
    redirect_to store_path unless @order || @personal_order
  end

  def create
    @order.personal_order = @personal_order

    begin
      @user = user_signed_in? ? current_user : create_new_user!

      if @user.user_data.nil?
        @user_data = UserData.create! user_data_params
        @user.user_data = @user_data
        @user.save!
      else
        @user_data = @user.user_data
        @user_data.update user_data_params
      end

      @order.user_data = @user_data
      @order.comment = params[:comment]
      @order.save!

      session[:personalOrder] = nil
      session[:order] = nil
      session[:user_data_id] =  @user_data.id
      session[:user_email] = params[:email]
      #NotificationMailer.order_created_notification(@order).deliver_now
    rescue ActiveRecord::RecordInvalid => e
      redirect_to profile_path
    rescue Exception => e
      flash[:title] = 'Could not create order!'
      flash[:alert] = e.message
      logger.fatal 'Could not create order!'
      logger.fatal e.message
      logger.fatal e.backtrace.inspect
      render action: 'new'
    end
  end

  def index
    redirect_to profile_path unless admin_signed_in?
    @orders = Order.select { |o| o.status == Order.submitted }
  end

  def show
    @order = Order.find(params[:id])
  end

  def destroy
    Order.find(params[:id]).destroy
    redirect_to controller: :orders,  action: :index
  end

  private
  def create_new_user!
    @password = Devise.friendly_token 8
    user = User.create! email: params[:email], password: @password, password_confirmation: @password
    print user
    sign_in :user, user
    NotificationMailer.user_registration(user).deliver_now
    user
  end

  def find_personal_order
    @personal_order = PersonalOrder.find_by_id session[:personalOrder] if session.include? :personalOrder
  end
end
