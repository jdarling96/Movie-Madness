"use strict";

const server = require("./server")
const { PORT } = require("./config");
const utils = require("../utils")
const axios = require("axios")
const ExternalApiController = require("../controller/externalApiController")
const ExternalAuthApiController = require("../controller/externalAuthApiController")
const ExternalAuthApiServices = require("../services/externalAuthApiServices")
//const createUserController = require("../controller/userController");

const ExternalApiServices = require("../services/externalApiServices")




const app = server({ExternalApiController, ExternalAuthApiController, ExternalAuthApiServices, ExternalApiServices, axios,utils})


app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});