"use strict";
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config/config")

class AuthServices{

    static createToken(userData) {
        let {username} = userData
        let payload = {
            username: username
        }

        return jwt.sign(payload, SECRET_KEY)
    }
}

module.exports = AuthServices