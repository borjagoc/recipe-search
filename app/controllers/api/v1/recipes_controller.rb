class Api::V1::RecipesController < ApplicationController
  def find_relevant_recipes
    recipes = Recipe.search_by_ingredients(params[:ingredients])
    render json: recipes
  end
end
