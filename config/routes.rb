Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :experiences
  resources :media
  resources :programs
  resources :organizations
  resources :users
  resources :sessions, only: [:create, :destroy]

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }, skip: [:sessions, :registrations, :passwords]

  namespace :api do
    namespace :v1 do
      resources :example
    end
  end
end
