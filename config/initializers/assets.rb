Rails.application.config.assets.version = '1.0'

pages = %w( hot store root )

pages.each do | page |
  Rails.application.config.assets.precompile += %W( pages/#{page}.js )
end

Rails.application.config.assets.precompile += %w( admin.js store/main.js hot.css )