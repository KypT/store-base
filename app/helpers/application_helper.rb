module ApplicationHelper
  def admin_signed_in?
    current_user and current_user.admin?
  end

  def editable
    if admin_signed_in?
       'contenteditable = true'
    end
  end
end
