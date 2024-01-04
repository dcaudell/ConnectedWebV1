# README


* Database creation
  
  [Install Homebrew]
  
  brew install postgres


* On Mac, postgres executables will (probably) be installed in /usr/local/opt/postgres/bin/ 
  
  >   initdb [Project_Root]/postgres
  
  >   createuser -s 

  >   pg_ctl -D [Project_Root]/postgres start
  
    createdb connected_web_v1_development


* ..or.. grab a docker image of postgres and create the database however you like, just make sure postgres is running lon localhost:5432 with postgres user defaults.


* Database initialization

  > ./bin/rails db:migrate


* How to run the test suite... (tailwindcss may have some issues which require special attention.) 

  > ./bin/bundle install

  > ./bin/rails tailwindcss:build
  
  > ./bin/rails assets:precompile
  
  > ./bin/rails tailwindcss:watch
  
  > ./bin/dev

* Browse to > http://0.0.0.0:3000/xgrids

* Usage: 
  - Click on a grid square to toggle that square from impassable (0) to passable (1)
  - If the grid is connected, the path through the grid will be automatically displayed via a blue border on connected squares.
  - Grid rows can be added and removed via the +/- buttons.
  - Grids can be persisted / modified / recalled via the pertinent buttons.

* Issues: 
  - Grids are editable outside the form page, but the display values are not bound to the grid.
  - Some DOM hanky-panky causes JS errors during page navigation that do not occur on a clean page-load.
  - Sometimes multiple valid paths are indicated through connected grids. 
  - There's some asset preload warnings occasionally.
  - tailwindcss seems to have some problems during build.
  - Inconsistent capitalization on 'Create Xgrid' button.
  - Styling isn't exactly 'pretty'.
  - The database is actually committed in the repo for convenience, which obviously one would not do normally.