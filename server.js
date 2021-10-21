'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// End Boiler Plate (This plus the app.listen)

// Bringing In Modules
let cache = require('./modules/cache.js');
let handleWeather = require('./modules/weather.js');
let handleMovies = require('./modules/movies.js');
let handleError = require('./modules/error.js');

// Set Routes
app.get('/', (request, response) => response.status(200).send('This is the root. It works!'));

app.get('/weather', handleWeather);
// This sets up the weather route.

app.get('/movies', handleMovies);
// This sets up the movies route.

// No routes match error
app.get('*', handleError);


// App.Listen aka making sure the port is set up.
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
