require 'httparty'
require 'json'
class AuthenticationController < ApplicationController
 skip_before_filter  :verify_authenticity_token
  def post_authenticate
  	puts params
   

  	hashed_password = Digest::SHA1.hexdigest(params[:password])
  	#auth = {:username => params[:username], :password => params[:password]}
    auth = {:username => "ritikavr", :password => "ritika"}
  	res = HTTParty.post('http://172.27.20.159:3000/api/authenticate',
      :body =>{:username =>params[:username],:password => hashed_password})
  	#JSON.parse(res.body)
    puts res.body
    if(res.body == "true") 
      redirect_to "/dashboard/index"
    else
      redirect_to "/authentication/authenticate"

    end
 	

  end
  
  def authenticate
  end


  def register_user
  end

  def post_register
  	hashed_password = Digest::SHA1.hexdigest(params[:password])
  	res = HTTParty.post('http://172.27.20.159:3000/api/adduser', 
  		:body => { :username => params[:username], :pwd => hashed_password,
  		 :email =>params[:email], :name => params[:name]})
  	#puts res.body
    @user = res.body
    puts @user
  	redirect_to "/authentication/authenticate"
  end

end
