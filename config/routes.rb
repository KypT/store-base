Rails.application.routes.draw do
  devise_for :users
  resources :products, path: 'store', except: 'edit, create'
  root 'pages#root'
end