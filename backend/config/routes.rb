Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :breeds, only: [:index]
  resources :users, only: [:create]
  resources :favorites, only: [:create, :destroy]
  post "login", to: "authentication#login"
  get "/", to: "docs#index"
end
