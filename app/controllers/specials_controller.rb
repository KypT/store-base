class SpecialsController < ApplicationController
  include StoreConcern
  before_action :set_special, only: [:show, :edit, :update, :destroy]

  def index
    @specials = Special.all
    @tab = 'specials'
  end

  def show
    id = params[:special_id].to_i
    @special = Special.find(id)
    @tab = 'specials'
  end

  def new
    @special = Special.create title: 'Акция', description: 'Описание'
    redirect_to special_special_path(@special.id, @special.url_title)
  end

  def update
    add_image if params[:image]
    @special.update(special_params)
    @special.image = Image.create file: params[:images][0] if params[:images]
    render nothing: true
  end

  def destroy
    @special.destroy
    redirect_to specials_url, notice: 'Special was successfully destroyed.'
  end

  private
  def add_image
    @special.image = Image.new(file: params[:image])
  end

  def set_special
    @special = Special.find(params[:special_id])
  end

  def special_params
    params.permit(:title, :description)
  end

end
