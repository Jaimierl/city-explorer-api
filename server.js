'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// End Boiler Plate (This plus the app.listen)

// Set Routes
app.get('/', (request, response) => response.status(200).send('This is the root. It works!'));

app.get('/weather', handleWeather);
// This sets up the weather route.

// No routes match error
app.get('*', (request, response) => {
  response.status(404).send('Page not found. Sorry :(');
});

function handleWeather(request, response) {
  // response.status(200).send('Weather Route Works');

  // Search Query Listening
  let { lat, lon, searchQuery } = request.query;

  console.log('query parameters: ', request.query);

  // Find Method to get data from the weather array
  let cityFinder = weather.find(element => (element.city_name.toLowerCase() === searchQuery.toLowerCase()
  ));


  // response.send(cityFinder);
  // This is to see the data on the local-host site
  console.log('cityFinder: ', cityFinder);
  // Remember console logs show up in terminal.


  try {
    const shapeOfWeather = cityFinder.data.map(day => new Forecast(day));

    console.log(shapeOfWeather);
    response.status(200).send(shapeOfWeather);

  }
  catch (error) {
    console.log('Cannot Find City');
    response.status(404).send('Please try something a different city like Paris, Amman, or Seattle.');
  }
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
  }
}


// App.Listen aka making sure the port is set up.
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
