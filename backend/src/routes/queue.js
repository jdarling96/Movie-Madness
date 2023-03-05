"use strict";
const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");

function queueRoutes({ QueueController, UserModel, QueueAndWatchlistModel }) {
  const router = express.Router();

  router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const queue = new QueueController(QueueAndWatchlistModel, UserModel);
      const data = await queue.getQueue(username);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  });

  router.post("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const movieData = req.body;
      const queue = new QueueController(QueueAndWatchlistModel, UserModel);
      const addedToQueue = await queue.addToQueue(movieData, username);
      return res.status(201).json({addedToQueue});
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username
      const movieData = req.body
      const queue = new QueueController(QueueAndWatchlistModel, UserModel)
      const deleteFromQueue = await queue.deleteFromQueue(movieData, username)
      return res.status(200).json({deleteFromQueue})
    } catch (error) {
      return next(error)
    }
  })

  return router;
}

module.exports.queueRoutes = queueRoutes;
