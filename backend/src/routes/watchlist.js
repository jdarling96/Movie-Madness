"use strict";
const express = require("express");

const { Router } = require("express");
const { ensureCorrectUser } = require("../middleware/auth");

function watchlistRoutes({ WatchlistController, UserModel, QueueAndWatchlistModel }) {
  const router = express.Router();

  router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const watchlist = new WatchlistController(QueueAndWatchlistModel, UserModel);
      const data = await watchlist.getWatchlist(username);
      return res.status(200).json(data);
    } catch (error) {
        return next(error)
    }
  });

  router.post("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const movieData = req.body;
      const watchlist = new WatchlistController(QueueAndWatchlistModel, UserModel);
      const addedToWatchlist = await watchlist.addToWatchlist(movieData, username);
      return res.status(201).json({addedToWatchlist});
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username
      const movieData = req.body
      const watchlist = new WatchlistController(QueueAndWatchlistModel, UserModel)
      const deleteFromWatchlist = await watchlist.deleteFromWatchlist(movieData, username)
      return res.status(200).json({deleteFromWatchlist})
    } catch (error) {
      return next(error)
    }
  })

  return router;
}

module.exports.watchlistRoutes = watchlistRoutes;
