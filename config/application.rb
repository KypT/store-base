require File.expand_path('../boot', __FILE__)
require 'rails/all'
Bundler.require(*Rails.groups)

module MintyStore
  class Application < Rails::Application
    config.autoload_paths += %w( /app/poro )
    config.active_record.raise_in_transactional_callbacks = true
    config.generators.javascript_engine :js
    config.i18n.default_locale = :ru
    config.time_zone = 'Ekaterinburg'
  end
end
