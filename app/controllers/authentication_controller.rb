require 'httparty'
require 'json'
class AuthenticationController < ApplicationController
  def post_authenticate
  	puts params
  	hashed_password = Digest::SHA1.hexdigest(params[:password])
  	res = HTTParty.post('http://172.27.20.159:3000/api/authenticate', 
  		:body => { :username => params[:username], :password => hashed_password})
  	#JSON.parse(res.body)
 	puts res.body 	
  end
  
  def authenticate
  end


  def register_user
  end
end
