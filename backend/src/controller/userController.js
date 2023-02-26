"use strict";
const { BadRequestError } = require("../expressErrorServices");

class UserController {
  constructor(UserService, UserModel) {
    this.UserService = UserService;
    this.UserModel = UserModel;
  }

  async updateUserInfo(userData) {
    try {
      const user = new this.UserService(this.UserModel);
      const update = await user.update(userData);
      return update;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserController;
