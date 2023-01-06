"use strict";
const express = require("express");
const router = express.Router();
const CreateUserController = require('../controller/createUserController')


router.post("/register", async (req, res, next) => {
    const {username, password} = req.body
    console.log(username, password)
    try {
        const newUser = await CreateUserController({username, password})
        return res.status(201).json(newUser)
        
    } catch (error) {
        return next(error)
        
    }

})


module.exports = router