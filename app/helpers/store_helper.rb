module StoreHelper
  def active_tab(tab)
    'active' if tab == @tab
  end

  def description_for(product)
    product.description ? product.description : 'Описание отсутствует'
  end
end
