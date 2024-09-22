class Api::V1::IngredientsController < ApplicationController
  def create
    user = User.find(params[:user_id]) # Get the user
    ingredient = Ingredient.find_or_create_by(name: ingredient_params[:name])
    user.ingredients << ingredient 

    if user.save!
      render json: ingredient, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    ingredient = Ingredient.find(params[:id])
    ingredient.destroy!

    render json: { message: 'Ingredient deleted' }, status: :ok
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name, :amount, :unit) # Permit optional amount and unit fields
  end
end