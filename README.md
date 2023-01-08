# Nodeapp

API made for create ads, designed with Node.js and MongoDB.

# NodeApp

Deploy:
npm install


Start the app in prodiction with:
npm start


Start the app in development with:
npm run dev


Load initial data to database:
npm run init-db


## API Documentation

Announcement list:
GET /api/anuncios

YOU can also filter by:
-name
-price
-sell yes or not: http://localhost:3000/api1/anuncios?onSell=false
-tag:  http://localhost:3000/api1/anuncios?tags=motor

-tags: CHECK OUT THE TAG link >>
http://localhost:3000/api1/anuncios/tags

## How to run DB for Linux and Mac
./bin/mongod --dbpath ./data
