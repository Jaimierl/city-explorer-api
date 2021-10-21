'use strict';
const axios = require('axios');
let cache = require('./cache.js');

async function handleMovies(request, response) {
  //response.status(200).send('Movie Route Works');
  let { partyTown } = request.query;

  // console.log('query parameter: ', request.query);

  let movieURL = ` https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${partyTown}`;
  // console.log(movieURL)

  if ((cache[partyTown]) && (Date.now() - cache[partyTown].timestamp) < 1000 * 60 * 24 * 3) {
    console.log('Movie Cache Hit');
    response.status(200).send(cache[partyTown].movieCache);
  }
  else {
    try {
      let movieTime = await axios.get(movieURL);

      let groovyMovies = movieTime.data.results.map(singleFilm => {
        return new Film(singleFilm);
      });

      // Adding to the Cache before sending the data back to the client:
      cache[partyTown] = {
        movieCache: groovyMovies,
        timestamp: Date.now()
      };
      console.log('Movie Cache Miss!');

      // console.log(groovyMovies);
      response.status(200).send(groovyMovies);

    }
    catch (error) {
      console.log(error);
      response.status(404).send(`Sorry, no movie info here: ${error}`);
    }
  }
}

class Film {
  constructor(singleFilm) {
    this.title = singleFilm.title;
    this.overview = singleFilm.overview;
    this.average_votes = singleFilm.vote_average;
    this.total_votes = singleFilm.vote_count;
    this.image_url = 'https://image.tmdb.org/t/p/w500' + singleFilm.poster_path;
    // For the image URL the data would return only a partial URL. We needed to go back and figure out the base URL to make sure we would have the full image URL.
    this.popularity = singleFilm.popularity;
    this.released_on = singleFilm.release_date;
  }
}

module.exports = handleMovies;