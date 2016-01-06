class ApplicationMailer < ActionMailer::Base
  default from: "master@minty-store.ru"
  layout 'mailer'

  def master_email
    'orum-the-cat@yandex.ru'
    '0KypT0@gmail.com'
  end
end
