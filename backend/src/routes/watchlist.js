"use strict";
const express = require("express");

const { Router } = require("express");
const { ensureCorrectUser } = require("../middleware/auth");

function watchlistRoutes({ TableController, UserModel, TableModel }) {
  const router = express.Router();

  router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const watchlist = new TableController(TableModel, UserModel, "watchlist");
      const data = await watchlist.getTable(username);
      return res.status(200).json(data);
    } catch (error) {
        return next(error)
    }
  });

  router.post("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const movieData = req.body;
      const watchlist = new TableController(TableModel, UserModel, "watchlist");
      const addedToWatchlist = await watchlist.addToTable(movieData, username);
      return res.status(201).json({addedToWatchlist});
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username
      const movieData = req.body
      const watchlist = new TableController(TableModel, UserModel, "watchlist")
      const deleteFromWatchlist = await watchlist.deleteFromTable(movieData, username)
      return res.status(200).json({deleteFromWatchlist})
    } catch (error) {
      return next(error)
    }
  })

  return router;
}

module.exports.watchlistRoutes = watchlistRoutes;
