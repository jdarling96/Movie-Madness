"use strict";
const express = require("express");


function authRoutes({ExternalApiController, ExternalAuthApiController, ExternalAuthApiServices, axios, utils}){
    const router = express.Router();

    router.post("/register", async function(req, res, next) {
        try {
            
        } catch (error) {
            return next(error)
            
        }

    })
    return router
}

module.exports.authRoutes = authRoutes