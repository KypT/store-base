module SpecialsHelper
  def special_url(special)
    special_special_path(special.id, special.url_title)
  end
end
