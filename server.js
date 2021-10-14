'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// End Boiler Plate (This plus the app.listen)

// Set Routes
app.get('/', (request, response) => response.status(200).send('This is the root. It works!'));

app.get('/weather', handleWeather);
// This sets up the weather route.

// app.get('/movies', handleMovies);
// This sets up the movies route.

// No routes match error
app.get('*', (request, response) => {
  response.status(404).send('Page not found. Sorry :(');
});

async function handleWeather(request, response) {
  // response.status(200).send('Weather Route Works');

  // Search Query Listening
  let { lat, lon, partyTown } = request.query;

  console.log('query parameters: ', request.query);

  let weatherURL = ` https://api.weatherbit.io/v2.0/forecast/daily?days=3&key=${process.env.WEATHER_API_KEY}&units=I&lat=${request.query.lat}&lon=${request.query.lon}`;

  try {
    let wildWeather = await axios.get(weatherURL);
    // console.log(wildWeather);
    let shapeOfWeather = wildWeather.data.data.map(weatherFileObj => {
      return new Forecast(weatherFileObj);
    });
    console.log(shapeOfWeather);
    response.status(200).send(shapeOfWeather);
  }
  catch (error) {
    console.log(error);
    response.status(404).send(`Sorry, no info here: ${error}`);
  }
}


class Forecast {
  constructor(weatherFileObj) {
    this.date = weatherFileObj.datetime;
    this.description = `Low of ${weatherFileObj.low_temp}, high of ${weatherFileObj.max_temp} with ${weatherFileObj.weather.description}`;
  }
}
// Take all data from line 47, put through the forecast mold, send back to line 50

// async function handleMovies{

// }

// App.Listen aka making sure the port is set up.
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
