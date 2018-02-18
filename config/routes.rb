Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      # Mock up for testing search results serialization
      get '/search', to: 'api_base#search'

      resources :users
      resources :experiences
      resources :media
      resources :programs
      resources :organizations
    end
  end
end
