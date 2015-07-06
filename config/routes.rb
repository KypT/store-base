Rails.application.routes.draw do
  root 'pages#root'
  devise_for :users

  resources :products, path: 'store', except: [:edit, :create] do
    post '' => 'products#update', on: :member
  end

  resources :cart, only: [:index, :new, :destroy] do
    get 'checkout', on: :collection
  end

  resources :orders, except: [:new, :update, :edit, :update]

end