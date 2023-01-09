"use strict";

const server = require("./server")
const { PORT, params } = require("./config");
const utils = require("../utils")
const axios = require("axios")
const ExternalApiController = require("../controller/externalApiController")
const createUserController = require("../controller/createUserController");

const ExternalApiServices = require("../services/externalApiServices")




const app = server({ExternalApiController, ExternalApiServices, axios, params, utils})


app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});