const { getCategories, postCategory } = require("../controllers/controllers");
const categoriesRouter = require("express").Router();

categoriesRouter.route("/").get(getCategories).post(postCategory);

module.exports = categoriesRouter;
