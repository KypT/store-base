class OrderItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :order

  validates_presence_of :product, :order
  validate :total_amount

  def price
    self.product.price * (self.buy_amount + self.repeat_amount)
  end

  def total_amount
    self.repeat_amount + self.buy_amount > 0
  end
end
