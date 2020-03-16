Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :ships
  resources :locations
  resources :trips
  resources :users

  post "/sessions",to: "session#create"
end
