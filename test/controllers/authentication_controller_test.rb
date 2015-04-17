require 'test_helper'

class AuthenticationControllerTest < ActionController::TestCase
  test "should get authenticate" do
    get :authenticate
    assert_response :success
  end

  test "should get register_user" do
    get :register_user
    assert_response :success
  end

end
