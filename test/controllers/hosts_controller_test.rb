require 'test_helper'

class HostsControllerTest < ActionController::TestCase
  test "should get add_new_host" do
    get :add_new_host
    assert_response :success
  end

  test "should get edit_host" do
    get :edit_host
    assert_response :success
  end

end
