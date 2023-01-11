"use strict";
const jsonschema = require("jsonschema");
const userRegisterSchema = require("../schemas/userRegister.json");
const {BadRequestError} = require("../services/expressErrorServices")

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
      // create user
      // if user is not allreadt duplicated
      
      // get guest session
      const externalApiGuestSessionKey = await this.ExternalAuthApiController.getApiSessionKey()

      // get jwt token and send it back


    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthController;
