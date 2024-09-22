class CreateUsersIngredientsJoinTable < ActiveRecord::Migration[7.1]
  def change
    create_table :ingredients_users, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid, index: true
      t.references :ingredient, null: false, foreign_key: true, type: :uuid, index: true
    end

    add_index :ingredients_users, [:user_id, :ingredient_id], unique: true
  end
end