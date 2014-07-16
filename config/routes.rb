Rails.application.routes.draw do
  resources :settings

  root to: "users#index"
  get "/auth/:provider/callback" => "sessions#create"
  get "/users" => "users#index"
  get "/signout" => "sessions#destroy", :as => :signout
end
