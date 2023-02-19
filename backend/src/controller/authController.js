"use strict";
const jsonschema = require("jsonschema");
const userRegisterSchema = require("../schemas/userRegister.json");
const userAuthSchema = require("../schemas/userAuth.json")
const {BadRequestError} = require("../expressErrorServices")

class AuthController {
  constructor(AuthServices, UserModel, ExternalAuthApiController, ExternalAuthApiServices, axios) {
    this.AuthServices = AuthServices;
    this.UserModel = UserModel;
    this.ExternalAuthApiServices = ExternalAuthApiServices
    this.axios = axios
    this.ExternalAuthApiController = new ExternalAuthApiController(this.ExternalAuthApiServices, axios)
  }

  async register(userData) {
    try {
      const validator = jsonschema.validate(userData, userRegisterSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }
      
      const newUser = new this.UserModel({...userData})
      // check if user is duplicated
      await newUser.checkUserDuplicates()
      // get guest session
      const externalApiGuestSessionKey = await this.ExternalAuthApiController.getApiSessionKey()
      
      //newUser.guestSession = externalApiGuestSessionKey
      newUser.setGuestSession(externalApiGuestSessionKey)
      // create user
      const registeredUser = await newUser.register()
      // get jwt token and send it back
      const token = this.AuthServices.createToken(userData)
      

      return {...registeredUser, token: token}


    } catch (error) {
      throw error;
    }
  }

  async login(userData) {
    try {
    const validator = jsonschema.validate(userData, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    // authenticate user
    const user = new this.UserModel({...userData})
    const authUser = await user.authenticate()
    // get token
    const token = this.AuthServices.createToken(userData)

    return {...authUser, token: token}



        
    } catch (error) {
        throw error
        
    }

  }
}

module.exports = AuthController;
