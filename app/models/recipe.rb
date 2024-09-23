class Recipe < ApplicationRecord
  def self.search_by_ingredients(ingredients)
    results = []

    Recipe.all.each do |recipe|
      recipe_ingredients = recipe.ingredients.map { |ing| normalize_ingredient(ing) }
      match_count = ingredients.count do |user_ingredient|
        recipe_ingredients.any? { |rec_ing| rec_ing.include?(normalize_ingredient(user_ingredient)) }
      end
      results << { recipe: recipe, match_count: match_count, total_ingredients: recipe.ingredients.count } if match_count > 0
    end

    # Sort the results by match count and return the top 50
    results.max_by(50) { |result| result[:match_count] }
  end

  private

  def self.normalize_ingredient(ingredient)
    ingredient.downcase.gsub(/[^a-z\s]/i, '') # Remove special characters, numbers, etc.
  end
end