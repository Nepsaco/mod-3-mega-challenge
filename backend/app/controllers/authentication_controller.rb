class AuthenticationController < ApplicationController

  def login
    @user = User.find_by(username: params[:username])

    if (@user&.authenticate(params[:password]))
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: {
        token: token,
        exp: time.strftime("%m-%d-%Y %H:%M"),
        name: @user.name,
      }, status: :ok
    else
      render json: { error: "unauthorized" }, status: :unauthorized
    end
  end
end
