class BreedsController < ApplicationController
  def index
    breeds = get_breeds

    begin
      @current_user = get_user

      @favorites = Favorite.where({
        user_id: @current_user.id
      }).map(&:breed_id)


      breeds = JSON.parse breeds.body
      breeds.map do |breed|
        if @favorites.include? breed["id"]
          breed["is_favorite"] = true
        end
      end

      render json: breeds
    rescue
      render json: breeds
    end
  end

  private

  def get_breeds
    @breeds = RestClient::Request.execute(
      method: "get",
      url: "https://api.thecatapi.com/v1/breeds",
      headers: {
        "x-api-key" => ENV['CAT_API_KEY']
      }
    )

  end
end
