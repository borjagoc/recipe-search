Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      get 'recipes/show/:id', to: 'recipes#show'
      post 'users/create'
      get 'users/index'
      get 'users/show/:id', to: 'users#show'
      post 'ingredients/create'
      delete 'ingredients/destroy/:id', to: 'ingredients#destroy'
      post 'recipes/find_relevant_recipes', to: 'recipes#find_relevant_recipes'
    end
  end
  root 'homepage#index'
  get '*path', to: 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
