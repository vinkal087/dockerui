require 'httparty'
require 'json'
class DashboardController < ApplicationController

  def index
  end


  

  def images
	res = HTTParty.get('http://172.27.20.159:3000/api/getbaseimages')
    @images = JSON.parse(res.body)
    puts @images

  end

  def cvm
	res = HTTParty.get('http://172.27.20.159:3000/api/getcvms')
    @cvms = JSON.parse(res.body)
    puts @cvms
  end

  def users
  	res = HTTParty.get('http://172.27.20.159:3000/api/getusers')
    @users = JSON.parse(res.body)
    puts @users
  end
  
  def create_cvm
    puts params
    userid = 1
    hostid = Random.new.rand(1..2).to_s 
    ispublic = params[:ispublic]
    
      
   
    puts "ispublic value"+ ispublic
    url = "http://172.27.20.159:3000/api/createcvm/user/#{userid}/image/#{params[:image]}/cvmname/#{params[:cvmname]}/public/#{ispublic}/host/#{hostid}"
    res =HTTParty.get(url)
    puts "hello "
    redirect_to :back
    #render :layout => "/dashboard/index"
  end
   def list_derivedimages
    res = HTTParty.get("http://172.27.20.159:3000/api/getderivedimages/#{params[:id]}")
    #@derived_images = JSON.parse(res.body)
    render json: res
  end
  

  def hosts
  	res = HTTParty.get('http://172.27.20.159:3000/api/gethosts')
    @hosts = JSON.parse(res.body)
    puts @hosts
  end
end
