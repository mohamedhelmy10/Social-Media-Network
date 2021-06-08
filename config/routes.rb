Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#index'
  resources :sessions, only: [:create , :new , :destroy]
  get '/users/:id/home', to: 'users#home'
  get '/users/:id/profile', to: 'users#profile'
  post '/users/:id/invite', to: 'users#invite'
  
  resources :users do
    resources :posts
  end
end
