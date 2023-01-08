"use strict";
const express = require("express");

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
      return res.status(201).json(await movie.getMovie(movieId, params));
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports.movieRoutes = movieRoutes;
