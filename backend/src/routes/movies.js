"use strict";
const { query } = require("express");
const express = require("express");
const { NotFoundError } = require("../services/expressErrorServices");

function movieRoutes({
  ExternalApiController,
  ExternalApiServices,
  axios,
  params,
  utils
}) {
  const router = express.Router();
  router.get("/now_playing", async function (req, res, next) {
    try {
      const query = req.query;
      const movies = new ExternalApiController(ExternalApiServices, axios, utils);
      const data = await movies.getNowPlaying(params, query);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  });

  router.get("/popular", async function (req, res, next) {
    try {
        const query = req.query;
        const movies = new ExternalApiController(ExternalApiServices, axios, utils)
        const data = await movies.getPopular(params, query)
        return res.status(200).json(data)

        
    } catch (error) {
        return next(error)
        
    }
  })

  router.get("/top_rated", async function(req, res, next) {
    try {
        const query = req.query
        const movies = new ExternalApiController(ExternalApiServices, axios, utils);
        const data = await movies.getTopRated(params, query)
        return res.status(200).json(data)
    } catch (error) {
        return next(error)
        
    }
    
  })

  router.get("/upcoming", async function(req, res, next) {
    try {
        const query = req.query
        const movies = new ExternalApiController(ExternalApiServices, axios, utils)
        const data = await movies.getUpcoming(params, query)
        return res.status(200).json(data)

        
    } catch (error) {
        return next(error)
        
    }
  })

  router.get("/:id", async function (req, res, next) {
    try {
      //console.log(req.query)
      const movieId = req.params.id;
      const movie = new ExternalApiController(ExternalApiServices, axios, utils);
      const data = await movie.getMovie(movieId, params);
      //console.log(data)

      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports.movieRoutes = movieRoutes;
