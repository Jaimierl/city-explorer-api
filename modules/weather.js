'use strict';
const axios = require('axios');
let cache = require('./cache.js');

async function handleWeather(request, response) {
  // response.status(200).send('Weather Route Works');

  // Search Query Listening
  let { lat, lon, partyTown } = request.query;
  let cacheKey = 'weather-lat-' + lat + '-lon-' + lon;

  // console.log('query parameters: ', request.query);

  let weatherURL = ` https://api.weatherbit.io/v2.0/forecast/daily?days=3&key=${process.env.WEATHER_API_KEY}&units=I&lat=${request.query.lat}&lon=${request.query.lon}`;

  // console.log(Object.keys(cache));
  // if (cache[cacheKey]) {
  //   console.log('cache timestamp', cache[cacheKey].timestamp, 'Date now', Date.now());
  //   console.log('Difference', Date.now() - (cache[cacheKey].timestamp));
  // }
  if ((cache[cacheKey]) &&
    (Date.now() - cache[cacheKey].timestamp) < 1000 * 60 * 3) {
    console.log('Weather Cache Hit!');
    response.status(200).send(cache[cacheKey].weatherCache);
  }

  else {
    try {
      let wildWeather = await axios.get(weatherURL);
      // console.log(wildWeather);
      let shapeOfWeather = wildWeather.data.data.map(weatherFileObj => {
        return new Forecast(weatherFileObj);
      });

      // // Adding to the Cache before sending the data back to the client:
      cache[cacheKey] = {
        weatherCache: shapeOfWeather,
        timestamp: Date.now()
      };
      console.log('Weather Cache Miss!');

      // console.log(shapeOfWeather);
      response.status(200).send(shapeOfWeather);
    }
    catch (error) {
      console.log(error);
      response.status(404).send(`Sorry, no weather info here: ${error}`);
    }
  }
}


class Forecast {
  constructor(weatherFileObj) {
    this.date = weatherFileObj.datetime;
    this.description = `Low of ${weatherFileObj.low_temp}, high of ${weatherFileObj.max_temp} with ${weatherFileObj.weather.description}`;
  }
}
// Take all data from let shapeofWeather, put through the forecast mold, send back to the send shapeOfWeather

module.exports = handleWeather;
