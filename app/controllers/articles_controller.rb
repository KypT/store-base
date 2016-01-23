class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  def new
    @article = Article.create title: 'Статья', content: 'Статья'
    redirect_to blog_article_path @article.id, @article.title
  end

  def update
    @article.update(article_params)
    render nothing: true
  end

  def destroy
    @article.destroy
    redirect_to blog_path
  end

  private
    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.permit(:title, :content)
    end
end
