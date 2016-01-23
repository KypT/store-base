module CategoriesHelper
  def category_url(category)
    category_collection_path(category.id, category.url_name)
  end
end
