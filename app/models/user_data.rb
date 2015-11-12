class UserData < ActiveRecord::Base
  validates_presence_of :name, :surname, :country, :city, :address, :index

  has_many :orders
  has_one :user
end