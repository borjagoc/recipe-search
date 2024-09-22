class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes, id: :uuid do |t|
      t.string :title
      t.integer :cook_time
      t.integer :prep_time
      t.string :ingredients, array: true, default: []
      t.decimal :ratings, precision: 3, scale: 2
      t.string :cuisine
      t.string :category
      t.string :author
      t.string :image
      t.timestamps
    end
  end
end
