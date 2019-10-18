class UsersController < ApplicationController
  def create
    @user = User.new(
      name: params[:name],
      username: params[:username],
      password: params[:password],
    )

    if (@user.save)
      render json: @user, status: :created
    else
      render json: { error: "Invalid user", status: :bad_request }
    end
  end
end
