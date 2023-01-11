"use strict";
const express = require("express");
const cors = require("cors");
const { NotFoundError } = require("../expressErrorServices");
const morgan = require("morgan");
const movieRouter = require("../routes/movies")
const authRouter = require("../routes/auth")



function server({ExternalApiController, ExternalAuthApiController, ExternalAuthApiServices, ExternalApiServices, AuthController, AuthServices, UserModel, axios, utils}){
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//app.use("/users", userRouter.userRoutes())
app.use("/auth", authRouter.authRoutes({ExternalAuthApiController, ExternalAuthApiServices, AuthController, AuthServices, UserModel, axios}))
app.use("/movies", movieRouter.movieRoutes({ExternalApiController, ExternalApiServices, axios, utils}))

app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  //if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

return app

}



module.exports = server