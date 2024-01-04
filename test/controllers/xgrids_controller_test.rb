require "test_helper"

class XgridsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @xgrid = xgrids(:one)
  end

  test "should get index" do
    get xgrids_url
    assert_response :success
  end

  test "should get new" do
    get new_xgrid_url
    assert_response :success
  end

  test "should create xgrid" do
    assert_difference("Xgrid.count") do
      post xgrids_url, params: { xgrid: { created_on: @xgrid.created_on, gridmodel: @xgrid.gridmodel, is_connected: @xgrid.is_connected, num_cols: @xgrid.num_cols, num_rows: @xgrid.num_rows, remarks: @xgrid.remarks } }
    end

    assert_redirected_to xgrid_url(Xgrid.last)
  end

  test "should show xgrid" do
    get xgrid_url(@xgrid)
    assert_response :success
  end

  test "should get edit" do
    get edit_xgrid_url(@xgrid)
    assert_response :success
  end

  test "should update xgrid" do
    patch xgrid_url(@xgrid), params: { xgrid: { created_on: @xgrid.created_on, gridmodel: @xgrid.gridmodel, is_connected: @xgrid.is_connected, num_cols: @xgrid.num_cols, num_rows: @xgrid.num_rows, remarks: @xgrid.remarks } }
    assert_redirected_to xgrid_url(@xgrid)
  end

  test "should destroy xgrid" do
    assert_difference("Xgrid.count", -1) do
      delete xgrid_url(@xgrid)
    end

    assert_redirected_to xgrids_url
  end
end
