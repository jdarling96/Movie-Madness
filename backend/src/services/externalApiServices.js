"use strict";

const {NotFoundError} = require("./expressErrorServices")

class ExternalApiServices {

    // get specific movie
    static async getMovie(axios,apiUrl,id, apiKey, params){
        let {getMovieRoute} = params
        try {
            const res = await axios.get(`${apiUrl}${getMovieRoute}${id}?${apiKey}`)
            .catch(function (error){
                if(error.response){
                    throw new NotFoundError("Movie not found in external API!")
                }
            })
            
            return res.data
            
        } catch (error) {
            return error
            
        }

    }
    
    // get movies now playing in theaters
    // get popular movies
    // get top rated movies
    // get upcoming movie
    // optional string:lang => default: en-US, int:page, string:region
    static async getMoviesGroupedBy(){
       

    }
    //Get movies by genre id /discover/movie  optional:with_genre={genreId}
    async getGenres(){
        

    }

    


}

module.exports = ExternalApiServices

