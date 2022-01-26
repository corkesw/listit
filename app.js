const express = require("express");
const { getWelcome } = require("./controllers/controllers");

const app = express();

app.use(express.json());

app.get("/api", getWelcome);

module.exports = app;
