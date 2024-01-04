class XgridsController < ApplicationController
  before_action :set_xgrid, only: %i[ show edit update destroy ]

  # GET /xgrids or /xgrids.json
  def index
    @xgrids = Xgrid.all
  end

  # GET /xgrids/1 or /xgrids/1.json
  def show
  end

  # GET /xgrids/new
  def new
    @xgrid = Xgrid.new
    @grid_uuid = "uid" + SecureRandom.uuid.first(8)
    @xgrid.gridmodel = [ [1,1,1,1,1,1,1],
                         [1,1,0,1,0,1,1],
                         [1,1,1,1,1,1,1],
                         [1,0,1,1,1,0,1],
                         [1,1,0,0,0,1,1],
                         [1,1,1,1,1,1,1]]
  end

  # GET /xgrids/1/edit
  def edit
    @grid_uuid = "uid" + SecureRandom.uuid.first(8);
  end

  # POST /xgrids or /xgrids.json
  def create
    @xgrid = Xgrid.new(xgrid_params)

    respond_to do |format|
      if @xgrid.save
        format.html { redirect_to xgrid_url(@xgrid), notice: "Xgrid was successfully created." }
        format.json { render :show, status: :created, location: @xgrid }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @xgrid.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /xgrids/1 or /xgrids/1.json
  def update
    respond_to do |format|
      if @xgrid.update(xgrid_params)
        format.html { redirect_to xgrid_url(@xgrid), notice: "Xgrid was successfully updated." }
        format.json { render :show, status: :ok, location: @xgrid }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @xgrid.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /xgrids/1 or /xgrids/1.json
  def destroy
    @xgrid.destroy!

    respond_to do |format|
      format.html { redirect_to xgrids_url, notice: "Xgrid was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_xgrid
      @xgrid = Xgrid.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def xgrid_params
      params.require(:xgrid).permit(:gridmodel, :num_rows, :num_cols, :is_connected, :created_on, :remarks)
    end
end
