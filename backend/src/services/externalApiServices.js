"use strict";

const { NotFoundError, BadRequestError } = require("../expressErrorServices");

class ExternalApiServices {
  // get specific movie
  static async getMovie(axios, apiUrl, id, apiKey, getMovieRoute) {
    

    const res = await axios
      .get(`${apiUrl}${getMovieRoute}${id}?${apiKey}`)
      .catch(() => {
        throw new NotFoundError("Movie not found in external API!");
      });

    return res.data;
  }

  // get movies now playing in theaters
  // get popular movies
  // get top rated movies
  // get upcoming movie
  // optional string:lang => default: en-US, int:page, string:region
  static async getMoviesGroupedBy(axios, apiUrl, route, apiKey, query) {
    
    let checkKeys = Object.keys(query)
    if (checkKeys.includes("page") || checkKeys.length === 0) {
      let page = +query.page || 1;
      if(page >= 1000) throw new BadRequestError("Maximum page reached!")
      const res = await axios
        .get(`${apiUrl}${route}?${apiKey}&page=${page}`)
        .catch(() => {
          throw new BadRequestError("Check API url or query string!");
        });
        return res.data;
    } else{
        throw new BadRequestError("Check API url or query string!");

    }

   
  }
  //Get movies by genre id /discover/movie  optional:with_genre={genreId}
  static async getGenres() {}

  static async searchMovies(axios, apiUrl, route, apiKey, query){
    let checkKeys = Object.keys(query)
    if (checkKeys.includes("query")) {
      let page = +query.page || 1;
      if(page >= 1000) throw new BadRequestError("Maximum page reached!")
      let searchQuery = query.query
      const res = await axios
        .get(`${apiUrl}${route}?${apiKey}&query=${searchQuery}&page=${page}`)
        .catch(() => {
          throw new BadRequestError("Check API url or query string!");
        });
        return res.data;
    } else {
        throw new BadRequestError("Check API url or query string!");
      }
  
  }
}

module.exports = ExternalApiServices;
