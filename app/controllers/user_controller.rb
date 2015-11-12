class UserController < ApplicationController
  def register
    @user = User.new user_params
    alert(@user.errors) and redirect_to new_user_registration_path and return unless @user.save
    @user.user_data = @user_data
    session[:user_data_id] = nil
    session[:user_email] = nil
    sign_in :user, @user
    render action: 'profile'
  end

  def profile
    redirect_to new_user_session_path unless current_user
  end

  private
  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end
