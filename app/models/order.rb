class Order < ActiveRecord::Base
  has_many :cart_entries
  has_many :products, :through => :cart_entries
  has_one :personal_order
  belongs_to :user_data

  validates_presence_of :user_data
  validates_presence_of :cart_entries, if: Proc.new { | a | a.personal_order.nil? }
  validates_presence_of :personal_order, if: Proc.new { | a | a.cart_entries.empty? }

  def entries_with(type)
    self.cart_entries.select { | e | e if e.order_type == type }
  end

  def total
    self.cart_entries.reduce(0) { |sum, entry| sum + entry.subtotal }
  end
end