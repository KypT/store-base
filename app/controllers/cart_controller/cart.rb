class CartController::Cart
  def initialize(session)
    session[:cart] = {'ids' => []} unless session[:cart]
    @session = session
  end

  def ids
    @session[:cart]['ids']
  end

  def items
    Product.find ids
  end

  def clear
    ids = []
  end

  def add(id)
    return if id <= 0 or ids.include? id
    ids << id
  end

  def remove(id)
    ids -= [id]
  end

  def checkout
    order = Order.new
    items.each {| item | order.products << item }
    order.save
    clear
  end
end