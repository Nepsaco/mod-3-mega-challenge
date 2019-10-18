class ApplicationController < ActionController::API
  def get_token
    header = request.headers['Authorization']
    header.split(' ').last if header
  end
  def get_user
    token = get_token
    @decoded = JsonWebToken.decode(token)
    User.find(@decoded[:user_id])
  end
  def authenticate_user

    begin
      @current_user = get_user
    rescue JWT::DecodeError => e
      render json: { errors: e.message, status: :unauthorized }
    end
  end
end
