"use strict";

const server = require("./server")
const { PORT } = require("./config");
const createUserController = require("../controller/createUserController");


const app = server(createUserController)


app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});