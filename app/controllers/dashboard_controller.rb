require 'httparty'
require 'json'
require 'influxdb'
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

  def edit_host
    hash = {}
    hostid = params[:edit_hostid]
    hash[:username] = params[:edit_username]
    #hash[:password] = params[:edit_password]
    hash[:cpu] = params[:edit_cpu]
    hash[:ram] = params[:edit_ram] 
    hash[:host_os] = params[:edit_host_os] 
    hash[:ip] = params[:edit_ip] 
    hash[:hostname] = params[:edit_hostname]
    hash[:active] = params[:edit_active] 
    hash[:storage] = params[:edit_storage] 
    new_param = {}
    new_param[:values] = hash
    HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/edithost/#{hostid}",:body => new_param)
    redirect_to :back

  end
  
  def create_cvm
    puts params
    userid = session[:user_id]
    hostid = 6
    ispublic = params[:ispublic]
     HTTParty.post(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/createcvm',
      :body =>{:userid => userid, :imageid =>params[:derivedimages], :cvmname => params[:cvmname],
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

  def gethostdetails
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/hostdetails/#{params[:id]}")
    res = JSON.parse(res.body)
    render json: res
  end

  def get_latest_data_from_influx
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/lastinfluxdata/#{params[:id]}")
    res = JSON.parse(res.body)
    render json: res


  end
  def get_latest_data_from_influx_mem
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/lastinfluxdatamem/#{params[:id]}")
    res = JSON.parse(res.body)
    render json: res
  end

  def get_latest_cvm_data_from_influx
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/lastinfluxcvmdata/#{params[:id]}")
    res = JSON.parse(res.body)
    render json: res


  end
  def get_latest_cvm_data_from_influx_mem
    res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+"/api/lastinfluxcvmdatamem/#{params[:id]}")
    res = JSON.parse(res.body)
    render json: res


  end
  
end


