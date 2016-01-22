class NotificationMailer < ApplicationMailer
  def order_created_notification(order)
     @order = order
     mail to: master_email, subject: 'Новый заказ'
  end

  def user_registration(user)
    @user = user
    mail to: user.email, subject: 'Добро пожаловать в Мятный Домик!'
  end
end
