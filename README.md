Project base endpoint /api
#### This project uses NodeJs with NestJs and postgres as a database and its extension postgis for storing spatial data

#### How to create postgis extension

[1] Install postgis
[2] "CREATE EXTENSION postgis;"
[3] "SELECT PostGIS_Version();" to check if it's added

#### Create the tables

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  location GEOMETRY(Point, 4326),
  description TEXT
);

CREATE TABLE polygons (
  id SERIAL PRIMARY KEY,
  area GEOMETRY(Polygon, 4326),
  description TEXT
);