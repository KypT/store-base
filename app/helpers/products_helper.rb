module ProductsHelper
  def tag_string(product)
    product.tags.map(&:name).join ' '
  end
end
