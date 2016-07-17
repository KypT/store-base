module ProfileConcern
  extend ActiveSupport::Concern

  def user_data_params
    params.require(:user_data).permit(:name, :surname, :fname, :phone, :skype, :vk, :country, :city, :address, :index, :about)
  end
end