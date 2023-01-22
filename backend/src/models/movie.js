"use strict";
const db = require("../db")
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressErrorServices");

  class Movie{
    constructor(movieId, movieName, posterPath){
        this.movieId = movieId;
        this.movieName = movieName;
        this.posterPath = posterPath;
    }

    async store() {
        const result = await db.query(
            `INSERT INTO movie(
                movie_id,
                poster_path,
                name)
            VALUES ($1, $2, $3)
            RETURNING movie_id AS "movieId", poster_path AS "posterPath", name`,
            [this.movieId, this.posterPath, this.movieName]
        )
        return result.rows[0]
    }

    async get() {
        const result = await db.query(
            `SELECT *
             FROM movie
             WHERE movie_id IN ()`
        )
    }

}




class Queue extends Movie{
    constructor(userId, movieId, movieName, poster_path){
        super(movieId, movieName, poster_path)
        this.userId = userId
    }

    async get() {
        const result = await db.query(
            `SELECT movie_id
             FROM movie
             WHERE user_id = $1`,
             [this.userId]
        )

        console.log(result)
    }


}