class BackfillRecipeData < ActiveRecord::Migration[7.1]
  def up
    require 'json'

    file_path = Rails.root.join('db', 'recipes-en.json')
    file = File.read(file_path)
    recipes = JSON.parse(file)

    recipes.each do |recipe_data|
      Recipe.create(
        title: recipe_data["title"],
        cook_time: recipe_data["cook_time"],
        prep_time: recipe_data["prep_time"],
        ingredients: recipe_data["ingredients"],
        ratings: recipe_data["ratings"],
        cuisine: recipe_data["cuisine"],
        category: recipe_data["category"],
        author: recipe_data["author"],
        image: recipe_data["image"]
      )
    end
  end

  def down
    Recipe.delete_all
  end
end