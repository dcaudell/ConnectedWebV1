require "application_system_test_case"

class XgridsTest < ApplicationSystemTestCase
  setup do
    @xgrid = xgrids(:one)
  end

  test "visiting the index" do
    visit xgrids_url
    assert_selector "h1", text: "Xgrids"
  end

  test "should create xgrid" do
    visit xgrids_url
    click_on "New xgrid"

    fill_in "Created on", with: @xgrid.created_on
    fill_in "Gridmodel", with: @xgrid.gridmodel
    check "Is connected" if @xgrid.is_connected
    fill_in "Num cols", with: @xgrid.num_cols
    fill_in "Num rows", with: @xgrid.num_rows
    fill_in "Remarks", with: @xgrid.remarks
    click_on "Create Xgrid"

    assert_text "Xgrid was successfully created"
    click_on "Back"
  end

  test "should update Xgrid" do
    visit xgrid_url(@xgrid)
    click_on "Edit this xgrid", match: :first

    fill_in "Created on", with: @xgrid.created_on
    fill_in "Gridmodel", with: @xgrid.gridmodel
    check "Is connected" if @xgrid.is_connected
    fill_in "Num cols", with: @xgrid.num_cols
    fill_in "Num rows", with: @xgrid.num_rows
    fill_in "Remarks", with: @xgrid.remarks
    click_on "Update Xgrid"

    assert_text "Xgrid was successfully updated"
    click_on "Back"
  end

  test "should destroy Xgrid" do
    visit xgrid_url(@xgrid)
    click_on "Destroy this xgrid", match: :first

    assert_text "Xgrid was successfully destroyed"
  end
end
