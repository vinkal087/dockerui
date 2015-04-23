class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  before_filter  :cors_preflight_check
  after_filter :cors_set_access_control_headers
  add_flash_types :error, :partial, :success
# For all responses in this controller, return the CORS access control headers.

	def cors_set_access_control_headers
	  puts "vinkal"
	  headers['Access-Control-Allow-Origin'] = '*'
	  headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
	  headers['Access-Control-Allow-Headers'] = '*'
	  headers['Access-Control-Request-Method'] = '*'
	  headers['Access-Control-Max-Age'] = "1728000"
	end

	# If this is a preflight OPTIONS request, then short-circuit the
	# request, return only the necessary headers and return an empty
	# text/plain.

	def cors_preflight_check
	  puts "ritika"
	  if request.method == :options
	    headers['Access-Control-Allow-Origin'] = '*'
	    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
	    headers['Access-Control-Allow-Headers'] = '*'
	    headers['Access-Control-Request-Method'] = '*'
	    headers['Access-Control-Max-Age'] = '1728000'
	    render :text => '', :content_type => 'text/plain'
	  end
	end
end
