class DBCart
  def initialize(order)
    @order = order
  end

  def products(type)
    items = @order.order_items.select { | item | item.send(field_name(type)) > 0 }
    items.map { |item| item.product }
  end

  def amounts(type)
    amounts = []
    if count > 0
      @order.order_items.each { | item | amounts[item.product.id] = item.send(field_name(type)) if item.send(field_name(type)) > 0}
    end
    amounts
  end

  def total
    if count > 0
      return @order.order_items.reduce(0) { |memo, item| memo + item.price }
    end
    0
  end

  def put(product, type, amount)
    @order.order_items.build 'product' => product, field_name(type) => amount
    @order.save
  end

  def update(product, type, amount)
    @order.order_items.each do |item|
      if item.product.id == product.id
        item.send(field_name(type) + '=', amount)
        item.destroy and return if item.buy_amount + item.repeat_amount == 0
        item.save
      end
    end
  end

  def include?(product, type)
    @order.order_items.any? { | item | item.product.id == product.id and item.send(field_name(type)) > 0 }
  end

  def remove(product, type)
    update(product, type, 0)
  end

  def order_items
    @order.order_items
  end

  def count
    @order.order_items.count
  end

  private
  def field_name(type)
    return 'buy_amount' if type == 'stocked'
    'repeat_amount' if type == 'copy'
  end
end