"use strict";
const express = require("express");
const cors = require("cors");
const { NotFoundError } = require("../services/expressErrorServices");
const morgan = require("morgan");
const userRouter = require("../routes/users")



function server(createUserController){
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/users", userRouter.userRoutes(createUserController))

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