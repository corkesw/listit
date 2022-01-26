const express = require("express");
const apiRouter = require("./routers/api-router");
const { getWelcome } = require("./controllers/controllers");
const { fourOhFour } = require("./errors/errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", fourOhFour);

module.exports = app;
