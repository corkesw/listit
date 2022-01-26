const { getCategories, getItems } = require("../controllers/controllers");

const itemsRouter = require("express").Router();

itemsRouter.route("/").get(getItems);

module.exports = itemsRouter;
