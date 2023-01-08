"use strict";

const { NotFoundError, BadRequestError } = require("./expressErrorServices");

class ExternalApiServices {
  // get specific movie
  static async getMovie(axios, apiUrl, id, apiKey, params) {
    let { getMovieRoute } = params;

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
  static async getMoviesGroupedBy(axios, apiUrl, params, apiKey, query) {
    let {getNowPlayingRoute} = params
    let page = +query.page || 1
    //if(page > 78) page = 78
    console.log(`${apiUrl}${getNowPlayingRoute}${apiKey}&page=${page}`)
    
    const res = await axios.get(`${apiUrl}${getNowPlayingRoute}${apiKey}&page=${page}`)
    .catch(() => {
        throw new BadRequestError("Check API url or query string!")
    })
    return res.data
  }
  //Get movies by genre id /discover/movie  optional:with_genre={genreId}
  async getGenres() {}
}

module.exports = ExternalApiServices;
