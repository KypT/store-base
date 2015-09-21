Rails.application.routes.draw do
  root 'pages#root'
  get 'payment' => 'pages#payment'
  get 'personal-order' => 'pages#uniq', as: 'personal_order'
  get 'about' => 'pages#about', as: 'about'
  get 'items/:name' => 'store#index'
  get 'blog' => 'blog#index', as: 'blog'
  get 'blog/article/:id' => 'blog#show'

  resources :products, path: 'items', except: [:edit, :create] do
    post '' => 'products#update', on: :member
    get 'get', on: :collection
  end

  scope :store do
    get '' => 'store#index', as: :store
    get 'get' => 'store#get'
    resources :categories, path: 'collections'
    resources :specials
  end

  resources :cart, only: [:index, :new, :destroy] do
    get 'checkout', on: :collection
  end

  resources :reviews, only:  [:index, :create, :destroy]

  resources :orders, except: [:update, :edit]
  resources :articles
  devise_for :users
end