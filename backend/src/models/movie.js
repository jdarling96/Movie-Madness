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

    async check(){
        const result = await db.query(
            `SELECT movie_id
             FROM movie
             WHERE movie_id = $1 `,
             [this.movieId]
        )
        if(result.rows[0]){
            return result.rows[0]

        }else{
            this.store()
        }
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

    async getMovies(ids) {
        
    
        const idsCount = Array.from(ids, (v,i) => `$${i + 1}`)
        const $ids = idsCount.join(",");
        

        
        const results = await db.query(
            `SELECT *
             FROM movie
             WHERE movie_id IN (${$ids})`,
             [...ids]
        )
        
        return results.rows
    }

}

module.exports = Movie
