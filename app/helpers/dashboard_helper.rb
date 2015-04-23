require 'httparty'
require 'json'
module DashboardHelper
  def get_base_images
	  res = HTTParty.get('http://172.27.20.159:3000/api/getbaseimages')
    @base_images = JSON.parse(res.body)
    #puts @base_images
  end
 
  def get_derived_images
	  res = HTTParty.get('http://172.27.20.159:3000/api/getderivedimages/1')
    @derived_images = JSON.parse(res.body)
    #puts @base_images
  end
  def gettablestate
  @tablestate = Hash["RUNNING" => "success", "KILLED" => "danger", "PAUSED"=> "warning", "STOPPED" => "active"]
  end
end
