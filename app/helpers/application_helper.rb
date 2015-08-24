module ApplicationHelper
  def admin_signed_in?
    current_user and current_user.admin?
  end

  def editable
    if admin_signed_in?
       'class = editable contenteditable = true'
    end
  end

  def editable(attr, url)
    if admin_signed_in?
      "contenteditable=true data-url=#{url} data-attr=#{attr}"
    end
  end

  def show_cart_counter
    'hide' unless @cart.count > 0
  end

  def lorem
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis dignissim leo. In egestas justo diam, a dictum nisl feugiat quis. Ut posuere luctus velit, et egestas metus sodales nec. Ut in molestie leo, ut scelerisque mi.'
  end

  def images_for(thing)
    if thing.images.empty?
      [image_url('missing-image.png')]
    else
      thing.images.map {| img | img.file.url }
    end
  end

  def image_for(thing)
    return image_url('missing-image.png') unless thing
    thing.image ? thing.image.file.url : image_url('missing-image.png')
  end
end
