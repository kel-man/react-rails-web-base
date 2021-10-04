Rails.application.routes.draw do
  devise_for :users, defaults: {format: :json}, controllers: {
  # devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    confirmations: 'users/confirmations',
  }
  root 'static_pages#index'

  get 'authstate' => 'auth_context#index'


  get '*path' => 'static_pages#index', constraints: lambda {|req| req.path.exclude? 'rails/active_storage'}
end
