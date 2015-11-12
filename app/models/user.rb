class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, uniqueness: { message: 'Пользователь с таким email уже зарегистрирован.' }

  has_one :user_data

  def admin?
    group == 'admin'
  end
end