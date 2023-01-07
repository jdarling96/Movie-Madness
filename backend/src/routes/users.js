"use strict";
const express = require("express");


function userRoutes(createUserController) {
    const router = express.Router();
    
    router.post("/register", async (req, res, next) => {
        const {username, password} = req.body
        try {
            const newUser = await createUserController({username, password})
            return res.status(201).json(newUser)
            
        } catch (error) {
            return next(error)
            
        }
    
    })
    return router


}





module.exports.userRoutes = userRoutes