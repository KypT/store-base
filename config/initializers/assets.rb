Rails.application.config.assets.version = '1.0'

controllers = %w( products pages cart specials )

controllers.each do | controller |
  Rails.application.config.assets.precompile += %W( #{controller}.js )
end

Rails.application.config.assets.precompile += %w( admin.js freewall/freewall.js store/main.js hot.css )
