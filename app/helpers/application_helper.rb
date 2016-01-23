module ApplicationHelper
  def admin_signed_in?
    current_user and current_user.admin?
  end

  def controller_and_action?(cnt, action)
    (cnt == controller.controller_name and action == controller.action_name) or
    (cnt == '/' + controller.controller_name and action == controller.action_name)
  end

  def header_link(controller, action, name)
    content_tag(:span, class: 'header-link') do
      link_to_if(!controller_and_action?(controller, action), name, {:controller => controller, :action => action}, class: 'link') do
        content_tag(:span, name, class: 'link current')
      end
    end
  end

  def user_email
    return current_user.email if user_signed_in?
    return session[:user_email] if  session[:user_email]
    ''
  end

  def pending_order?
    @cart.count > 0 or not session[:personalOrder].nil?
  end

  def price(number)
    number_to_currency(number, :precision => 0)
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

  def product_image(product)
    product.images.count > 0 ? product.images.first : Image.new;
  end

  def image_for(thing, type = 'regular')
    return image_url('missing-image.png') unless thing

    image = thing.image if thing.respond_to? :image
    image = thing.images[0] if thing.respond_to? :images
    image = Image.new if image.nil?

    type == 'original' ? image.file.url : image.file.send(type).url
  end
end
