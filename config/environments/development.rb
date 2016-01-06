Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.assets.debug = true
  config.assets.digest = true
  config.assets.raise_runtime_errors = true
  config.action_view.raise_on_missing_translations = false

  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
      :authentication => :plain,
      :address => "smtp.mailgun.org",
      :port => 587,
      :domain => "minty-store.ru",
      :user_name => "postmaster@minty-store.ru",
      :password => "8b8f1968be9ae6a88587adebcc4ebde3"
  }
end
