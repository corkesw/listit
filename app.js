const express = require("express");
const apiRouter = require("./routers/api-router");
const { getWelcome } = require("./controllers/controllers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;
