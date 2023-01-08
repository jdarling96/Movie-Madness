"use strict";
const express = require("express");
const {NotFoundError} = require("../services/expressErrorServices")

function movieRoutes({
  ExternalApiController,
  ExternalApiServices,
  axios,
  params,
}) {
  
    const router = express.Router();
  router.get("/:id", async function (req, res, next) {
    try {
      const movieId = req.params.id;
      const movie = new ExternalApiController(ExternalApiServices, axios);
      const data = await movie.getMovie(movieId, params)
      console.log(data)
      
      
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports.movieRoutes = movieRoutes;
