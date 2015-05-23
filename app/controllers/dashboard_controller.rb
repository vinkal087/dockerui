require 'httparty'
require 'json'
class DashboardController < ApplicationController
skip_before_filter  :verify_authenticity_token
  def index
  end


  

  def images
	res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getbaseimages')
    @images = JSON.parse(res.body)
    puts @images

  end

  def image_commit
     
  end

  def cvm
    tablestate = Hash["RUNNING" => "success", "KILLED" => "danger", "PAUSED"=> "warning", "STOPPED" => "active"]
	  res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getcvms')
    @cvms = JSON.parse(res.body)
    #res2 = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getcvmsdetail/')

    puts @cvms

  end

  def users
  	res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getusers')
    @users = JSON.parse(res.body)
    puts @users
  end
  
  def create_cvm
    puts params
    userid = 5
    hostid = 1 
    ispublic = params[:ispublic]
   
    #url = "APP_CONFIG['REST_API']['SERVER_NAME']/api/createcvm/
    #       user/#{userid}/image/#{params[:image]}/cvmname/#{params[:cvmname]}/
    #       public/#{ispublic}/host/#{hostid}/cpu/#{params[:cpu]}/memory/#{params[:ram]}"
     HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/createcvm',
      :body =>{:userid => userid, :imageid =>params[:image], :cvmname => params[:cvmname],
               :hostid => hostid, :cpu => params[:cpu],:memory => params[:ram], :public =>ispublic})
    #res =HTTParty.get(url)
    #puts JSON.parse(res.body)
    
    #flash[:notice] = "Post successfully created"
    redirect_to :back
        
    #render :layout => "/dashboard/index"
  end
  def list_derivedimages
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/getderivedimages/#{params[:id]}")
    #@derived_images = JSON.parse(res.body)
    render json: res
  end
  
  def operatecvm
     res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/operatecvm/#{params[:cvmid]}/#{params[:operation]}")
     render json: res
  end

  def hosts
  	res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/gethosts')
    @hosts = JSON.parse(res.body)
    puts @hosts
  end
  
  
  def getcvmdetails
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/cvmdetails/#{params[:id]}")
    res = JSON.parse(res.body)
    
    render json: res
  end
end


