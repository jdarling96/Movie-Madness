"use strict";
const db = require("../db")
const Movie = require("../models/movie")
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressErrorServices");

  class Queue extends Movie{
    constructor(userId, movieId, movieName, posterPath){
        super(movieId, movieName, posterPath)
        this.userId = userId
    }

    async getQueue() {
        const result = await db.query(
            `SELECT movie_id
             FROM queue
             WHERE user_id = $1`,
             [this.userId]
        )

        console.log(result)
    }

    async checkDuplicate(){
        const result = await db.query(
            `SELECT *
             FROM queue
             WHERE user_id = $1 AND movie_id = $2`,
             [this.userId, this.movieId]
        )
        if(result.rows[0]) throw new BadRequestError("Movie already exists in queue!")

    }

    async add(){
        const result = await db.query(
            `INSERT INTO queue(
                user_id,
                movie_id)
                VALUES ($1, $2)
                RETURNING user_id AS "userId", movie_id AS "movieId"`,
                [this.userId, this.movieId]
        )

        return result.rows[0]
    }


}

module.exports = Queue