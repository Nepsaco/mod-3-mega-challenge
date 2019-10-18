class FavoritesController < ApplicationController
  before_action :authenticate_user

  def create
    @favorite = Favorite.create({
      user_id: @current_user.id,
      breed_id: params[:breed_id]
    })

    render status: :created
  end

  def destroy
    @favorite = Favorite.find_by({
      user_id: @current_user.id,
      breed_id: params[:id]
    })
    @favorite.destroy

    render status: :no_content
  end
end
