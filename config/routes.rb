Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      root 'users#index'
      post "users/login", to: "users#login"
      post '/users/:user_id/invitations/:friend_id', to: 'invitations#create'
      get '/users/:user_id/posts/profile/:id', to: 'posts#profile'
      get '/users/:user_id/invitations/friends', to: 'invitations#friends'
      put '/users/:user_id/invitations/destroy/:id', to: 'invitations#destroy'
      
  
      resources :users, only: [:create, :show, :update, :destroy] do
        resources :posts, only: [:index, :create, :update, :destroy] do
          resources :comments, only: [:index, :create, :update, :destroy]
          resources :reactions, only: [:index, :create, :update, :destroy]
          resources :notifications, only: [:index, :create, :update, :destroy]
        end
        resources :invitations, only: [:index, :update]
      end
    end
  end
  
end
