class ConnectedController < ApplicationController
  def index
    @grid = [ [1,1,1],
              [0,0,1],
              [1,0,1] ]
  end
end
