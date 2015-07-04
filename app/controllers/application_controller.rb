class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_site_sections
  def set_site_sections
    @sections = YAML.load_file(File.join Rails.root, 'config/sections.yml')
  end
end