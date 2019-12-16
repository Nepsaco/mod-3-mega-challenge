class BreedsController < ApplicationController
  def index
    breeds = get_breeds


    render json: breeds
  end

  private

  def get_breeds
    @breeds = RestClient::Request.execute(
      method: 'get',
      url: 'https://api.thecatapi.com/v1/breeds',
      headers: {
        'x-api-key' => Rails.application.credentials.dig(:CATS_API_KEY)
      }
    )
  end

end
