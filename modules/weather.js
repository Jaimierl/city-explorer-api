'use strict';
const axios = require('axios');

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
    response.status(404).send(`Sorry, no weather info here: ${error}`);
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
