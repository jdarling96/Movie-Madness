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
const QueueAndWatchlistModel = require("../models/queueAndWatchlist")
const QueueController = require("../controller/queueController")
const WatchlistController = require("../controller/watchlistController")
const UserController = require("../controller/userController")
const UserService = require("../services/userService")


const ExternalApiServices = require("../services/externalApiServices")




const app = server({ExternalApiController, ExternalAuthApiController, ExternalAuthApiServices, ExternalApiServices, AuthController, 
  AuthServices, QueueController, WatchlistController, QueueAndWatchlistModel, UserController, UserService, UserModel, axios,utils})


app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});