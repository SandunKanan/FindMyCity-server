# Find My City - server
#### Formerly myGlobalHome

## Installation instructions:
In your terminal, navigate to the folder you want to contain the project
git@github.com:SandunKanan/FindMyCity-server.git
cd FindMyCity-server

#### .env file
Create a .env file
Add the following lines
PORT=8080
CLIENT_URL=http://localhost:3000
PASSWORD=<your db password>

#### Create the database
CREATE DATABASE findmycity
    DEFAULT CHARACTER SET = 'utf8mb4';

#### Install the packages
npm i

#### Populate DB tables
knex migrate:up
knex seed:run

#### Run the server
npm start
