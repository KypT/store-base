module CartHelper
  def counter_id(product)
    'cart-counter-' + product.id.to_s
  end
end
