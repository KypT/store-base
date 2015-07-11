module ProductsHelper
  def tag_string(product)
    product.tags.map(&:name).join ' '
  end

  def image_for(product)
    if product.images.empty?
      image_url 'missing-image.png'
    else
      product.images.first.file.url
    end
  end

end
