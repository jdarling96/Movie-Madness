"use strict";
const { BadRequestError } = require("../expressErrorServices");
const jsonschema = require("jsonschema");
const userUpdateSchema = require("../schemas/userUpdate.json");

class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async update(userData) {
    try {
      const { username } = userData;
      const { currentPassword, ...rest } = userData.userData;

      const validator = jsonschema.validate(rest, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }

      const user = new this.UserModel({ username, password: currentPassword });
      await user.authenticate();
      let acceptedForQuery = {
        newPassword: "password",
        email: "email",
      };

      const keys = Object.keys(rest);
      const vals = keys.map(
        (key, idx) => `"${acceptedForQuery[key]}"=$${idx + 1}`
      );

      if (rest["newPassword"]) {
        const hashNewPass = await user.setBcryptPass(rest["newPassword"]);
        rest["newPassword"] = hashNewPass;
      }

      const updateUser = await user.update({
        columns: vals.join(", "),
        values: Object.values(rest),
      });
      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(userData) {
    try {
    const { username } = userData
    const { password } = userData.userData
    const user = new this.UserModel({ username, password: password });
    await user.authenticate();
    const deleteUser = await user.delete()
    return deleteUser
        
    } catch (error) {
        throw error
    }

  }
}

module.exports = UserService;
