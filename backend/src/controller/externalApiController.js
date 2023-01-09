"use strict";
const { API_KEY, API_URL } = require("../config/config");


class ExternalApiController {
  constructor(ExternalApiServices, axios, utils) {
    this.ExternalApiServices = ExternalApiServices;
    this.axios = axios;
    this.API_KEY = API_KEY;
    this.API_URL = API_URL;
    this.utils = utils
  }
  // get a movie from movie ID
  async getMovie(id, params) {
    let {getMovieRoute} = params
    try {
      const res = await this.ExternalApiServices.getMovie(
        this.axios,
        this.API_URL,
        id,
        this.API_KEY,
        getMovieRoute
      );
      return this.utils.createImageFromApiObject(res);
    } catch (error) {
      throw error;
    }
  }
  // get movies now playing in theaters
  // optional string:lang => default: en-US, int:page, string:region
  async getNowPlaying(params, query) {
    let {getNowPlayingRoute} = params
    try {
      const res = await this.ExternalApiServices.getMoviesGroupedBy(
        this.axios,
        this.API_URL,
        getNowPlayingRoute,
        this.API_KEY,
        query
      );


      return this.utils.createImageFromApiArray(res);
    } catch (error) {
      throw error;
    }
  }
  // get popular movies
  async getPopular(params, query) {
    let {getPopularRoute} = params
    try {
        const res = await this.ExternalApiServices.getMoviesGroupedBy(
            this.axios,
            this.API_URL,
            getPopularRoute,
            this.API_KEY,
            query
          );

          return this.utils.createImageFromApiArray(res)
        
    } catch (error) {
        throw error
    }
    
  }
  // get top rated movies
  async getTopRated(params, query) {
    let {getTopRatedRoute} = params
    try {
        const res = await this.ExternalApiServices.getMoviesGroupedBy(
            this.axios,
            this.API_URL,
            getTopRatedRoute,
            this.API_KEY,
            query
          );
          return this.utils.createImageFromApiArray(res)
        
    } catch (error) {
        throw error
        
    }
    
  }
  // get upcoming movie
  async getUpcoming() {
    const res = await this.ExternalApiServices();
  }

  //Get movies by genre id /discover/movie  optional:with_genre={genreId}
  async getGenres() {
    const res = await this.ExternalApiServices();
  }
}

module.exports = ExternalApiController;
