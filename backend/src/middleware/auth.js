"use strict";
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config/config")
const { UnauthorizedError } = require("../expressErrorServices")

function authUser(){
    function authenticateJWT(req, res, next) {
        try {
          const authHeader = req.headers && req.headers.authorization;
          if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
          }
          return next();
        } catch (err) {
          return next();
        }
      }
      return authenticateJWT

}

module.exports.authUser = authUser