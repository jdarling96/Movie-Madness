"use strict";
const express = require("express");
const {ensureCorrectUser} = require("../middleware/auth")


function queueRoutes({
    QueueController,
    UserModel,
    QueueModel,

}){
    const router = express.Router();

    router.get("/:username", ensureCorrectUser, async function(req, res, next) {
        try {
            // queue controller
            
        } catch (error) {
            return next(error)
            
        }

    })

    router.post("/:username", ensureCorrectUser, async function(req, res, next){
        try {
            const username = req.params.username;
            const movieData = req.body;
            const queue = new QueueController(QueueModel, UserModel)
            const data = await queue.addToQueue(movieData, username)
            return res.status(201).json(data)
        } catch (error) {
            return next(error)
            
        }
    })



    return router


}

module.exports.queueRoutes = queueRoutes