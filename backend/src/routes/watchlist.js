"use strict";
const express = require("express");

const { Router } = require("express");
const { ensureCorrectUser } = require("../middleware/auth");

function watchlistRoutes({WatchlistController, WatchlistModel, UserModel}){
    const router = express.Router()

    router.get("/:username", ensureCorrectUser, async function(req, res, next){
        try {
            
        } catch (error) {
            
        }
    })


    return Router
}

module.exports = watchlistRoutes