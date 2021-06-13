Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api/v1' do
    root 'users#index'
    resources :sessions, only: [:create, :new, :destroy]
    post "users/login", to: "users#login"
    get "users/auto_login", to: "users#auto_login"
    get '/users/:user_id/posts/profile/:id', to: 'posts#profile'
    get '/users/:user_id/invitations/friends', to: 'invitations#friends'
  
    resources :users, only: [:index, :create, :show, :update, :destroy] do
      resources :posts, only: [:index, :create, :show, :update, :destroy] do
        resources :comments, only: [:index, :create, :show, :update, :destroy]
        resources :reactions, only: [:index, :create, :show, :update, :destroy]
        resources :notifications, only: [:index, :create, :show, :update, :destroy]
      end
      resources :invitations, only: [:index, :create, :update, :destroy]
    end
  end
  
end
