Rails.application.routes.draw do

  root 'pages#root'

  get 'payment' => 'pages#payment'
  get 'about' => 'pages#about', as: 'about'
  get 'personal-order' => 'pages#uniq', as: 'personal_order'
  get 'profile' => 'user#profile'
  get 'tags' => 'tags#list'
  get 'sitemap' => 'pages#sitemap'
  get 'items/new' => 'products#new'

  post 'personal-order' => 'pages#make_uniq'
  post 'user' => 'user#register', :as => :user
  post 'subscriptions/new', as: 'new_subscription'

  scope :blog do
    get '' => 'blog#index', as: 'blog'
    get 'article/:id/:title' => 'blog#show', as: 'blog_article'
    resources :articles, only: [:new, :destroy] do
      post '' => 'articles#update', on: :member
    end
  end

  resources :products, path: 'items', except: [:new, :edit, :create, :show] do
    delete '/image/:id' => 'products#delete_image', on: :member
    post '/images' => 'products#reorder_images', on: :member
    get '/:name' => 'store#index', as: 'item'
    post '/:product_name' => 'products#update', on: :member
    get '' => 'products#get', on: :member
  end

  scope :store do
    get 'new' => 'store#new', as: :new_product
    get '' => 'store#index', as: :store
    get 'get' => 'store#get'
    resources :categories, path: 'collections', only: [:index, :new] do
      get ':url_name' => 'categories#show', as: 'collection'
      post ':url_name' => 'categories#update'
      delete ':url_name' => 'categories#destroy'
    end
    resources :specials, only: [:index, :new] do
      get ':url_name' => 'specials#show', as: 'special'
      post ':url_name' => 'specials#update'
      delete ':url_name' => 'specials#destroy'
    end
    get '/:tag' => 'store#index'
  end

  resources :cart, only: [:index, :new, :destroy] do
    get 'checkout', on: :collection
  end

  resources :reviews, only:  [:index, :create, :destroy]
  resources :orders, except: [:update, :edit]

  devise_for :users, :skip => [:sessions]
  as :user do
    get 'login' => 'users/sessions#new', :as => :new_user_session
    post 'login' => 'users/sessions#create', :as => :user_session
    delete 'logout' => 'users/sessions#destroy', :as => :destroy_user_session
    get 'logout' => 'users/sessions#destroy'
  end


end