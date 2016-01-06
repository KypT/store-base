Rails.application.routes.draw do

  get 'user/update'

  root 'pages#root'
  get 'payment' => 'pages#payment'
  get 'personal-order' => 'pages#uniq', as: 'personal_order'
  post 'personal-order' => 'pages#make_uniq'
  get 'about' => 'pages#about', as: 'about'
  get 'blog' => 'blog#index', as: 'blog'
  get 'blog/article/:id' => 'blog#show', as: 'blog_article'
  get 'items/new' => 'products#new'
  post 'user' => 'user#register', :as => :user
  get 'profile' => 'user#profile'
  post 'subscriptions/new', as: 'new_subscription'
  post 'images/create', as: 'new_image'

  resources :products, path: 'items', except: [:edit, :create, :show] do
    get '/:name' => 'store#index'
    post '' => 'products#update', on: :member
    get 'get', on: :collection
  end

  scope :store do
    get '' => 'store#index', as: :store
    get 'get' => 'store#get'
    resources :categories, path: 'collections'
    resources :specials
    get '/:tag' => 'store#index'
  end

  resources :cart, only: [:index, :new, :destroy] do
    get 'checkout', on: :collection
  end

  resources :reviews, only:  [:index, :create, :destroy]

  resources :orders, except: [:update, :edit]
  resources :articles do
    post '' => 'articles#update', on: :member
  end

  devise_for :users, :skip => [:sessions]
  as :user do
    get 'login' => 'users/sessions#new', :as => :new_user_session
    post 'login' => 'users/sessions#create', :as => :user_session
    delete 'logout' => 'users/sessions#destroy', :as => :destroy_user_session
    get 'logout' => 'users/sessions#destroy'
  end


end