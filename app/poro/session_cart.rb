class SessionCart
  def initialize(session)
    session[:products] = [] unless session[:products]
    @session = session
  end

  def products
    begin
      Product.find @session[:products]
    rescue
      []
    end
  end

  def clear
    @session[:products] = nil
  end

  def put(product)
    @session[:products] << product.id
  end

  def remove(product)
    @session[:products] -= [product.id]
  end

  def checkout
    Order.create products: self.products
    self.clear
  end
end