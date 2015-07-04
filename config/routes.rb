Rails.application.routes.draw do
  devise_for :users

  resources :products, path: 'store', except: 'edit, create'
  post 'store/:id' => 'products#update'

  root 'pages#root'
end