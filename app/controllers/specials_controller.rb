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
    @special = Special.new
  end

  def edit
  end

  def create
    @special = Special.new(special_params)
    add_image if params[:image]
    if @special.save
      redirect_to specials_path, notice: 'Special was successfully created.'
    else
      render :edit
    end
  end

  def update
    add_image if params[:image]
    @special.update(special_params)
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
