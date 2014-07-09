Rails.application.routes.draw do
  root to: "users#new"
  get "/auth/:provider/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout
end
