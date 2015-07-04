Rails.application.config.assets.version = '1.0'

controllers = %w( products pages )

controllers.each do | controller |
  Rails.application.config.assets.precompile += %W( #{controller}.js #{controller}.css )
end

Rails.application.config.assets.precompile += %w( admin.js )