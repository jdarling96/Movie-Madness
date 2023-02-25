"use strict";
const db = require("../db")
const Movie = require("./movie")
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressErrorServices");

  class Table extends Movie{
    constructor(userId, table, movieId, movieName, posterPath){
        super(movieId, movieName, posterPath)
        this.userId = userId
        this.table = table
    }

    async getTable() {
        const results = await db.query(
            `SELECT movie_id AS "movieId"
             FROM ${this.table}
             WHERE user_id = $1`,
             [this.userId]
        )

        if(!results.rows[0]){
            throw new NotFoundError(`No ${this.table} found for user!`)
        }

        return results.rows
    }

    async checkDuplicate(){
        const result = await db.query(
            `SELECT *
             FROM ${this.table}
             WHERE user_id = $1 
             AND movie_id = $2`,
             [this.userId, this.movieId]
        )
        if(result.rows[0]) throw new BadRequestError(`Movie already exists in ${this.table}`)

    }

    async add(){
        const result = await db.query(
            `INSERT INTO ${this.table}(
                user_id,
                movie_id)
                VALUES ($1, $2)
                RETURNING user_id AS "userId", movie_id AS "movieId"`,
                [this.userId, this.movieId]
        )

        return result.rows[0]
    }

    async delete(){
        const result = await db.query(
            `DELETE 
             FROM ${this.table}
             WHERE user_id = $1 
             AND movie_id = $2
             RETURNING movie_id`,
             [this.userId, this.movieId]
        )

        if(!result.rows[0]){
            throw new NotFoundError(`No movie: ${this.movieId}`)
        }
        return `Movie ${this.movieId} deleted from ${this.table}`
    }


}

module.exports = Table