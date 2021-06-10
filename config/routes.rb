Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#index'
  resources :sessions, only: [:create, :new, :destroy]
  resources :invitations, only: [:index, :create, :update, :destroy]
  get '/users/:id/home', to: 'users#home'
  get '/users/:id/profile', to: 'users#profile'
  get '/invitations/friends', to: 'invitations#friends'
  
  resources :users do
    resources :posts do
      resources :comments, only: [:new , :create, :edit, :update, :destroy]
    end
  end
  
end
