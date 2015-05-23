require 'httparty'
require 'json'
module DashboardHelper
  def get_base_images
	  res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getbaseimages')
    @base_images = JSON.parse(res.body)
    #puts @base_images
  end
 
  def get_derived_images
	  res = HTTParty.get(APP_CONFIG['REST_API']['SERVER_NAME']+'/api/getderivedimages/1')
    @derived_images = JSON.parse(res.body)
    #puts @base_images
  end
  def gettablestate
  @tablestate = Hash["RUNNING" => "success", "KILLED" => "danger", "PAUSED"=> "warning", "STOPPED" => "danger"]
  end
end
