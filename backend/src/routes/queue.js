"use strict";
const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");

function queueRoutes({ TableController, UserModel, TableModel }) {
  const router = express.Router();

  router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const queue = new TableController(TableModel, UserModel, "queue");
      const data = await queue.getTable(username);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  });

  router.post("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username;
      const movieData = req.body;
      const queue = new TableController(TableModel, UserModel, "queue");
      const addedToQueue = await queue.addToTable(movieData, username);
      return res.status(201).json({addedToQueue});
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
      const username = req.params.username
      const movieData = req.body
      const queue = new TableController(TableModel, UserModel, "queue")
      const deleteFromQueue = await queue.deleteFromTable(movieData, username)
      return res.status(200).json({deleteFromQueue})
    } catch (error) {
      return next(error)
    }
  })

  return router;
}

module.exports.queueRoutes = queueRoutes;
