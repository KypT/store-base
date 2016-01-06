class NotificationMailer < ApplicationMailer
  def order_created_notification(order)
     @order = order
     mail to: master_email, subject: 'Новый заказ'
  end
end
