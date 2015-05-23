require 'httparty'
require 'json'
class DashboardController < ApplicationController
skip_before_filter  :verify_authenticity_token
authorize_resource :class => false, :only => [:users,:create_host]

  def index
  end

  def images
	  res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getbaseimages')
    @images = JSON.parse(res.body)
  end

  def cvm
    tablestate = Hash["RUNNING" => "success", "KILLED" => "danger", "PAUSED"=> "warning", "STOPPED" => "active"]
	  res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/getcvms/#{session[:user_id]}")
    @cvms = JSON.parse(res.body)
  end

  def users
  	res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getusers')
    @users = JSON.parse(res.body)
  end

  def create_host
    HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/addhost',
      :body =>{:username => params[:username], :password => params[:password], :cpu => params[:cpu], :ram => params[:ram], :host_os => params[:host_os], :ip => params[:ip], :hostname => params[:hostname], :active => params[:active], :storage => params[:storage] })
    redirect_to :back
  end
  
  def create_cvm
    puts params
    userid = session[:user_id]
    hostid = 1 
    ispublic = params[:ispublic]
     HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/createcvm',
      :body =>{:userid => userid, :imageid =>params[:image], :cvmname => params[:cvmname],
               :hostid => hostid, :cpu => params[:cpu],:memory => params[:ram], :public =>ispublic})
    redirect_to :back
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
    hoststate = Hash["true" => "success", "false" => "danger"]
  	res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/gethosts')
    @hosts = JSON.parse(res.body)
  end
  
  
  def getcvmdetails
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/cvmdetails/#{params[:id]}")
    res = JSON.parse(res.body)
    render json: res
  end
end


