class CartEntry < ActiveRecord::Base
  belongs_to :product
  belongs_to :order

  validates_presence_of :product, :order, :amount, :order_type
  validates :amount, numericality: { greater_than: 0 }
  validates :order_type, inclusion: {  in: %w( stocked copy order ) }

  def subtotal
    self.product.price * self.amount
  end
end
