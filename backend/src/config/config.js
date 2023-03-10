"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const API_KEY = process.env.API_KEY 
const API_URL = process.env.API_URL 

const PORT = +process.env.PORT || 3002;

const params = {
  getMovieRoute: "/movie/",
  getNowPlayingRoute: "/movie/now_playing",
  getPopularRoute: "/movie/popular",
  getTopRatedRoute: "/movie/top_rated",
  getUpcomingRoute: "/movie/upcoming",
  getGuestSessionRoute: "/authentication/guest_session/new",
  getSearchMovieRoute: "/search/movie"
}

// Use dev database, testing database, or via env var, production database
 function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "movie_madness_test"
      : process.env.DATABASE_URL || "movie_madness";
} 

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Movie Madness Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  API_KEY,
  API_URL,
  params
};
