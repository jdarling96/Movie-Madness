"use strict";

const server = require("./server")
const { PORT } = require("./config");
const utils = require("../utils")
const axios = require("axios")
const ExternalApiController = require("../controller/externalApiController")
const ExternalAuthApiController = require("../controller/externalAuthApiController")
const ExternalAuthApiServices = require("../services/externalAuthApiServices")
const AuthController = require("../controller/authController")
const AuthServices = require("../services/authServices")
const UserModel = require("../models/user")
const QueueModel = require("../models/queue")
const QueueController = require("../controller/queueController")
//const createUserController = require("../controller/userController");

const ExternalApiServices = require("../services/externalApiServices")




const app = server({ExternalApiController, ExternalAuthApiController, ExternalAuthApiServices, ExternalApiServices, AuthController, AuthServices, QueueController, QueueModel, UserModel, axios,utils})


app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});