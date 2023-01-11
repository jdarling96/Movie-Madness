"use strict";

const bcrypt = require("bcrypt");
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config/config")
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressErrorServices");

  class User {
    constructor({username, password, email}){
        this.username = username
        this.password = password
        this.email = email
        this.guestSession = ""
    }

    async checkUserDuplicates(){
        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [this.username]
        )
        if(duplicateCheck.rows[0]){
            throw new BadRequestError(`Duplicate username: ${this.username}`)
        }

    }

    async register() {
        

        const hashedPassword = await bcrypt.hash(this.password, BCRYPT_WORK_FACTOR)

        const result = await db.query(
            `INSERT INTO users
             (username,
              password,
              email,
              guest_session)
             VALUES ($1, $2, $3, $4)
             RETURNING username, email, guest_session AS "guestSession"`,
          [
            this.username,
            hashedPassword,
            this.email,
            this.guestSession,
          ],
      );

      const user = result.rows[0]
      return user

        

    }
  }

  module.exports = User