class AddUserDataReferenceToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :user_data
  end
end
