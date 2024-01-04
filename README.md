# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
  [Install Homebrew]
  brew install postgres
  # DB will be committed. Otherwise...
  # initdb [Project_Root]/postgres
  /usr/local/Cellar/postgresql/<version>/bin/createuser -s postgres or /usr/local/opt/postgres/bin/createuser -s postgres which will just use the latest version.
  start postgres server manually: pg_ctl -D [Project_Root]/postgres start


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
