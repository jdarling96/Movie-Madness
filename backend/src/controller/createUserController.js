"use strict";
const {BadRequestError} = require("../services/expressErrorServices")

module.exports = function CreateUserController ({username, password}) {
    try {
    if(username.length > 5 && password.length > 5) throw new BadRequestError("username sucks!")
    return 'Success!'
        
    } catch (error) {
        return error
        
    }
    
}