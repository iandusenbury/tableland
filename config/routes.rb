Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }, skip: [:sessions, :registrations, :passwords]

  constraints subdomain: 'api.roadmaps' do
    scope module: 'api' do
      namespace :v1 do
        get 'search', to: 'api_base#search'
        # Get all users (super_admin), Get a specific user with all their media and experiences, update a specific user, destroy a specific user
        resources :users, only: [:index, :show, :update, :destroy] do
          # Get a random user, Get the current user, Get the current user's permissions
          collection do
            get 'random'
            get 'current'
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
          # Assign an admin to an org for permission to edit (super_admin), get all admins for an org (super_admin)
          member do
            post 'permissions', to: 'organizations#grant_permission'
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
          # Assign an admin to a program for permission to edit (super_admin), get all admins for a program (super_admin)
          member do
            post 'permissions', to: 'programs#grant_permission'
            get 'admins'
          end
          # Create media for progs (admins), update media for progs (admins), and destroy media for progs (admins)
          resources :media, only: [:create, :update, :destroy]
        end

      end
    end
  end
end
