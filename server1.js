'use strict';
// (First Attempt - Not working.)

// Express Server
const express = require('express');

// .env file
require('dotenv').config;

// CORS - Security
const cors = require('cors');

const app = express();
app.use(cors());

// Port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Listening on Port: ', PORT));

app.get('/', (request, response) => {
  response.send('Welcome to the City Explorer Server!');
});

// IS THIS HOW THIS WORKS?
const weatherJSON = require('./weather');

app.get('/weather', getWeather);

function getWeather(request, response) {
  // See Query Parameters
  // Is this where the GET request lat, lon, and SearchQuery parts go? Why did we do .lat here again?
  console.log('request city:', request.query.city, 'request lat:', request.query.lat, 'request lon:', request.query.lon);
  // Is this where we would use the .find method on the query?
  const cityFinder = request.query.city.find(citySearch = arrayElement.city_name);
  const citylat = request.query.lat.find(latSearch = arrayElement.lon);
  const citylon = request.query.lon.find(citylon = arrayElement.lat);

  // Shape Response Data aka Taking L's on Dot notation.
  const shapeOfWeather = weatherJSON.map((weatherArrayElement) => {
    return {
      date = weatherArrayElement.data.valid_date,
      description = weatherArrayElement.data.weather.description
    };
    // ?? The quotation marks/dot notation here is a sticking point.Also how to make .map return info as objects within its array.
  });
  // Still not sure that these dates have to do with the rendering. Are we showing three days worth of weather if they choose one of our cities?
};

// Sending the data from the server back to the client.
response.send(shapeOfWeather);

// Making URLs for each city
// So the Get request would have helped us by filtering by the cityName/lat/lon so the shapeOfWeather array would just be the three date/description entries somehow hopefully.

app.get('/Amman', (request, response) => response.json({ shapeOfWeather.date, shapeOfWeather.description }))

app.get('/Paris', (request, response) => response.json({ shapeOfWeather.date, shapeOfWeather.description }))

app.get('/Seattle', (request, response) => response.json({ shapeOfWeather.date, shapeOfWeather.description }))

app.get('*', (request, response) => {
  response.status(404).send('Please try a different city like Seattle, Paris, or Amman')
  // This sends back an error message if the user chooses a city we do not have data on.
})
