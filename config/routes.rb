Rails.application.routes.draw do
  resources :specials

  root 'pages#root'
  get 'payment' => 'pages#payment'
  get 'uniq' => 'pages#uniq'
  get 'specials' => 'pages#specials'
  get 'hot' => 'products#hot'
  devise_for :users

  resources :categories

  resources :products, path: 'store', except: [:edit, :create] do
    post '' => 'products#update', on: :member
    get 'get', on: :collection
  end

  resources :cart, only: [:index, :new, :destroy] do
    get 'checkout', on: :collection
  end

  resources :orders, except: [:new, :update, :edit, :update]

end