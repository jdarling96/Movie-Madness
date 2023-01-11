"use strict";
const express = require("express");


function authRoutes({AuthServices, UserModel, ExternalAuthApiController, ExternalAuthApiServices, AuthController, axios}){
    const router = express.Router();

    router.post("/register", async function(req, res, next) {
        try {
            const userData = req.body
            console.log(userData)
            const auth = new AuthController(AuthServices, UserModel, ExternalAuthApiController, ExternalAuthApiServices, axios)
            const data = await auth.register(userData)
            return res.status(201).json(data)

            
        } catch (error) {
            return next(error)
            
        }

    })
    return router
}

module.exports.authRoutes = authRoutes