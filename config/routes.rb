Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  constraints subdomain: 'api.roadmaps' do
    scope module: 'api' do
      namespace :v1 do
        # Mock up for testing search results serialization
        get 'search', to: 'api_base#search'

        # resources :users
        # resources :experiences
        # resources :media
        # resources :programs
        # resources :organizations

        # ------------ With admin scope separation -------------------------
        # Get a specific user with all their media and experiences, update a specific user, destroy a specific user
        resources :users, only: [:show, :update, :destroy] do
          # Get a random user
          collection do
            get 'random'
          end
          # Create experiences for a user, update experiences for a user, destory experiences for a user
          resources :experiences, only: [:create, :update, :destroy]
          # Create media for a user, update media for a user, destroy media for a user
          resources :media, only: [:create, :update, :destroy]
        end

        # Get a specific organization with all their media, users, and programs, create a new organization
        resources :organizations, only: [:show, :create] do
          # Create programs for an organization
          resources :programs, only: :create
        end

        # Get a specific program with all their media, users, and parent organizations
        resources :programs, only: :show

        scope '/admin' do
          # Super admins can get all users
          resources :users, only: :index do
            # Admins can get all their permissions, super admins can grant new permissions 
            member do
              get 'permissions',  to: 'users#permissions'
              post 'permissions', to: 'users#add_permission'
            end
          end

          # Super admins can see all orgs (optional), admins can update orgs
          resources :organizations, only: [:index, :update] do
            # Admins can create media for orgs, update media for orgs, and destroy media for orgs
            resources :media, only: [:create, :update, :destroy]
          end

          # Super admins can see all progs (optional), admins can update progs
          resources :programs, only: [:index, :update] do
            # Admins can create media for progs, update media for progs, and destroy media for progs
            resources :media, only: [:create, :update, :destroy]
          end
        end
        # ------------------------------------------------------------------

        # ------------ Without admin scope separation ----------------------
        # Get all users (super_admin), Get a specific user with all their media and experiences, update a specific user, destroy a specific user
        # resources :users, only: [:index, :show, :update, :destroy] do
        #   # Get a random user
        #   collection do
        #     get 'random'
        #   end
        #   # Get all permissions (admins), Assign a new permission (super_admin)
        #   member do
        #       get 'permissions',  to: 'users#permissions'
        #       post 'permissions', to: 'users#add_permission'
        #   end
        #   # Create experiences for a user, update experiences for a user, destory experiences for a user
        #   resources :experiences, only: [:create, :update, :destroy]
        #   # Create media for a user, update media for a user, destroy media for a user
        #   resources :media, only: [:create, :update, :destroy]
        # end

        # # Get all orgs (super_admin/optional), Get a specific organization with all their media, users, and programs, create a new organization,
        # # Update an org (admins)
        # resources :organizations, except: :destroy do
        #   # Create programs for an organization
        #   resources :programs, only: :create
        #   # Create media for orgs (admins), update media for orgs (admins), and destroy media for orgs (admins)
        #   resources :media, only: [:create, :update, :destroy]
        # end

        # # Get all progs (super_admin/optional), Get a specific program with all their media, users, and parent organizations,
        # # Update a prog (admins)
        # resources :programs, only: [:index, :show, :update] do
        #     # Create media for progs (admins), update media for progs (admins), and destroy media for progs (admins)
        #     resources :media, only: [:create, :update, :destroy]
        # end
        # ------------------------------------------------------------------

      end
    end
  end
end
