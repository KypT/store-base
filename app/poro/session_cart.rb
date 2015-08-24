class SessionCart
  def initialize(session)
    session[:products] = [] unless session[:products]
    @session = session
  end

  def products(type)
    Product.find @session[:products].collect { | p | p['type'] == type ? p['id'] : nil }.compact
  end

  def amounts(type)
    amounts = []
    @session[:products].each { | p | amounts[p['id']] = p['amount'] if p['type'] == type  }
    amounts
  end

  def total
    @session[:products].reduce(0) { |memo, item| memo + Product.find(item['id']).price * item['amount'].to_i }
  end

  def clear
    @session[:products] = nil
  end

  def put(product, type, amount)
    return if amount <= 0
    @session[:products] << { 'id' => product.id, 'type' => type, 'amount' => amount } unless include? product, type
  end

  def update(product, type, amount)
    remove product, type and return if amount <= 0
    ind = @session[:products].find_index { | p | p['id'] == product.id and p['type'] == type }
    @session[:products][ind] = { 'id' => product.id, 'type' => type, 'amount' => amount }
  end

  def include?(product, type)
    @session[:products].any? { | p | p['id'] == product.id and p['type'] == type }
  end

  def remove(product, type)
    p = get_record(product, type)
    @session[:products].delete p if p
  end

  def make_order
    order = Order.new
    @session[:products].each do | p |
      order.cart_entries << CartEntry.create(product: Product.find(p['id']), amount: p['amount'], order_type: p['type'])
    end
    order
  end

  def count
    @session[:products] ? @session[:products].count : 0
  end

  private
  def get_record(product, type)
    result = @session[:products].select { | p | p if (p['id'] == product.id and p['type'] == type) }
    result.count > 0 ? result[0] : nil
  end
end