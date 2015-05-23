require 'httparty'
require 'json'
class AuthenticationController < ApplicationController
 skip_before_filter  :verify_authenticity_token
 skip_before_filter :authenticate_session, :only=> [:authenticate,:post_authenticate]
 @loggedin = Hash["userid" => "" ]
 respond_to :json
  def post_authenticate
    #redirect_to "/dashboard/index"
      if request.post? && params[:username].present? && params[:password].present?
        hashed_password = Digest::SHA1.hexdigest(params[:password])
        res = HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/authenticate',:body =>{:username =>params[:username],:password => hashed_password})
        hash = JSON.parse(res.body)
        if hash['AUTHENTICATION'] == "SUCCESS"
          session[:user_id] = params[:username]
          session[:role] = hash[:ROLE]
          redirect_to "/dashboard/index"
        else
            flash[:error] = "Invalid  Username or password"
            redirect_to "/authentication/authenticate"
        end
      else
        flash[:error] = "Login to continue"
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
