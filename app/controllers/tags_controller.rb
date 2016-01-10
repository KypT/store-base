class TagsController < ApplicationController
  def list
    render json: Tag.all.map { |tag| tag.name }
  end
end