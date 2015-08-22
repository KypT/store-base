module ProductsHelper
  def tag_string(product)
    product.tags.map(&:name).join ' '
  end

  def category_for(product)
    product.category ? product.category.name : '';
  end

  def search_result(products)
    products.empty? ? 'products/emptySearch' : products
  end

  def description_for(product)
    product.description.length > 0 ? product.description : lorem
  end
end
