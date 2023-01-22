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



    return router


}

module.exports.queueRoutes = queueRoutes