"use strict";
const express = require("express");


function userRoutes({createUserController}) {
    const router = express.Router();

    router.patch("/:username", ensureCorrectUser, async function (req, res, next) {
        try {

          const username = req.params.username;
          const queue = new TableController(TableModel, UserModel, "queue");
          const data = await queue.getTable(username);
          return res.status(200).json(data);
        } catch (error) {
          return next(error);
        }
      });
    


    
    
    return router


}





module.exports.userRoutes = userRoutes