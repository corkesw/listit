const { getCategories } = require("../controllers/controllers");
const categories = require("../db/data/test-data/categories");

const categoriesRouter = require("express").Router();

categoriesRouter.route("/").get(getCategories);

module.exports = categoriesRouter;
