Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      get 'recipes/create'
      get 'recipes/show'
      get 'recipes/destroy'
      get 'recipes/index'
      post 'recipes/create'
      get 'recipes/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
      post 'users/create'
      get 'users/index'
      get 'users/show/:id', to: 'users#show'
    end
  end
  root 'homepage#index'
  get '*path', to: 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
