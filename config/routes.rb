Testfrontend::Application.routes.draw do

  get "authentication/authenticate"

  get "dashboard/index"
  get "dashboard/images"
  get "dashboard/cvm"
  get "dashboard/users"
  get "dashboard/hosts"
  get "newhome/index"
  get "myhome/index"
 
  #get "dashboard/login"
  
  get 'dashboard/getcvmdetails/:id' => 'dashboard#getcvmdetails'
  get 'dashboard/listderivedimages/:id' => 'dashboard#list_derivedimages'
  get 'dashboard/gethostdetails/:id' => 'dashboard#gethostdetails'
  get 'dashboard/operatecvm/:cvmid/:operation' => 'dashboard#operatecvm'
  post 'dashboard/createcvm' => 'dashboard#create_cvm'
  post 'dashboard/createhost' => 'dashboard#create_host'
  post 'dashboard/edithost' => 'dashboard#edit_host'
  post 'authentication/postauthenticate' => 'authentication#post_authenticate'
  get 'authentication/register_user' => 'authentication#register_user'
  post 'authentication/post_register' => 'authentication#post_register'
  get 'authentication/logout' => 'authentication#logout'
  get 'dashboard/lastinfluxdata/:id' => 'dashboard#get_latest_data_from_influx'
  root 'authentication#authenticate'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do



  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
