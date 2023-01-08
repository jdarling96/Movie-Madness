"use strict";
const { API_KEY, API_URL } = require("../config/config");
const utils = require("../utils");


class ExternalApiController {
  constructor(ExternalApiServices, axios) {
    this.ExternalApiServices = ExternalApiServices;
    this.axios = axios;
    this.API_KEY = API_KEY;
    this.API_URL = API_URL;
  }
  // get a movie from movie ID
  async getMovie(id, params) {
    try {
      const res = await this.ExternalApiServices.getMovie(
        this.axios,
        this.API_URL,
        id,
        this.API_KEY,
        params
      );
      return utils(res);
    } catch (error) {
      throw error;
    }
  }
  // get movies now playing in theaters
  // optional string:lang => default: en-US, int:page, string:region
  async getNowPlaying() {
    const res = await this.ExternalApiServices();
  }
  // get popular movies
  async getPopular() {
    const res = await this.ExternalApiServices();
  }
  // get top rated movies
  async getTopRated() {
    const res = await this.ExternalApiServices();
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
