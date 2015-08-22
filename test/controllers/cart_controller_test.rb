require 'test_helper'

class CartControllerTest < ActionController::TestCase
  test "should get index" do
    get :catalog
    assert_response :success
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get destroy" do
    get :destroy
    assert_response :success
  end

  test "should get update" do
    get :update
    assert_response :success
  end

end
