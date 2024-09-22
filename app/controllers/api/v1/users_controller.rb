class Api::V1::UsersController < ApplicationController
  def index
    render json: User.all
  end

  def create
    user = User.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def show
  end

  def destroy
  end

  private

  def user_params
    params.permit(:name)
  end
end
