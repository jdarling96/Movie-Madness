"use strict";

const server = require("./server")
const { PORT } = require("./config");
const axios = require("axios")
const ExternalApiController = require("../controller/externalApiController")
const createUserController = require("../controller/createUserController");

const ExternalApiServices = require("../services/externalApiServices")

const params = {
    getMovieRoute: '/movie/',
    getNowPlayingRoute: '/movie/now_playing?',
}


const app = server({ExternalApiController, ExternalApiServices, axios, params})


app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});