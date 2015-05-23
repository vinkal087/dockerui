require 'httparty'
require 'json'
class AuthenticationController < ApplicationController
 skip_before_filter  :verify_authenticity_token
 @loggedin = Hash["userid" => "" ]
  def post_authenticate
  	puts params
   

  	hashed_password = Digest::SHA1.hexdigest(params[:password])
  	#auth = {:username => params[:username], :password => params[:password]}
    auth = {:username => "ritikavr", :password => "ritika"}
  	res = HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/authenticate',
      :body =>{:username =>params[:username],:password => hashed_password})
  	#JSON.parse(res.body)
    puts res.body
    if(res.body == "true") 
      flash[:success] = "Welcome!!!"
      redirect_to "/dashboard/index"
    else
      flash[:error] = "Username or Password Incorrect"
      redirect_to "/authentication/authenticate"

    end
 	

  end
  
  def authenticate
  end


  def register_user
  end

  def post_register
  	hashed_password = Digest::SHA1.hexdigest(params[:password])
  	res = HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/adduser', 
  		:body => { :username => params[:username], :pwd => hashed_password,
  		 :email =>params[:email], :name => params[:name]})
  	#puts res.body
    @user = res.body
    
  	redirect_to "/authentication/authenticate"
  end

end
