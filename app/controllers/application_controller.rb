class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_site_sections
  before_action :init_cart
  layout 'headered'

  def set_site_sections
    @sections = YAML.load_file(File.join Rails.root, 'config/sections.yml')
  end

  def init_cart
    @cart = SessionCart.new session
  end
end