class Order < ActiveRecord::Base
  has_many :order_items
  has_many :products, :through => :order_items
  has_one :personal_order
  belongs_to :user_data

  def entries_with(type)
    field = type == 'stocked' ? 'buy_amount' : 'repeat_amount'
    self.order_items.select { | e | e if e.send(field) > 0 }
  end

  def total
    self.order_items.reduce(0) { |sum, entry| sum + entry.price }
  end
end