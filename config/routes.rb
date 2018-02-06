Rails.application.routes.draw do
  resources :dummies
  resources :experiences
  resources :media
  resources :programs
  resources :organizations
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :example
    end
  end
end
