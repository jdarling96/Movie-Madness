"use strict";
const express = require("express");
const  {ensureCorrectUser} = require("../middleware/auth")


function userRoutes({ UserController, UserService, UserModel }) {
    const router = express.Router();

    router.patch("/:username", ensureCorrectUser, async function (req, res, next) {
        try {

          const username = req.params.username;
          const userData = req.body
          const user = new UserController(UserService, UserModel)
          const updatedUser = await user.updateUserInfo({username, userData})
          return res.status(201).json({updatedUser});
        } catch (error) {
          return next(error);
        }
      });
    


    
    
    return router


}





module.exports.userRoutes = userRoutes;