Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }, skip: [:sessions, :registrations, :passwords]

  namespace :api do
    namespace :v1 do
      get 'search', to: 'api_base#search'
      # Get all users (super_admin), Get a specific user with all their media and experiences, update a specific user, destroy a specific user
      resources :users, only: [:index, :show, :update, :destroy] do
        # Get a random user, Get the current user
        collection do
          get 'random'
          get 'current'
        end
        # Get the permissions for a user
        member do
          get 'permissions'
        end
        # Create experiences for a user, update experiences for a user, destory experiences for a user
        resources :experiences, only: [:create, :update, :destroy]
        # Create media for a user, update media for a user, destroy media for a user
        resources :media, only: [:create, :update, :destroy]
      end

      # Get all orgs (super_admin/optional), Get a specific organization with all their media, users, and programs, create a new organization,
      # Update an org (admins)
      resources :organizations, except: :destroy do
        # Assign an admin to an org for permission to edit, revoke the permission for an admin to edit an org,
        # and get all admins for an org
        member do
          post 'permissions', to: 'organizations#grant_permission'
          delete 'revoke', to: 'organizations#revoke_permission'
          get 'admins'
        end
        # Create programs for an organization
        resources :programs, only: :create
        # Create media for orgs (admins), update media for orgs (admins), and destroy media for orgs (admins)
        resources :media, only: [:create, :update, :destroy]
      end

      # Get all progs (super_admin/optional), Get a specific program with all their media, users, and parent organizations,
      # Update a prog (admins)
      resources :programs, only: [:index, :show, :update] do
        # Assign an admin to a program for permission to edit, revoke the permission for an admin to edit a prog,
        # and get all admins for a program (super_admin)
        member do
          post 'permissions', to: 'programs#grant_permission'
          delete 'revoke', to: 'programs#revoke_permission'
          get 'admins'
        end
        # Create media for progs (admins), update media for progs (admins), and destroy media for progs (admins)
        resources :media, only: [:create, :update, :destroy]
      end

    end
  end

  get '/(*path)', to: 'index'
end
