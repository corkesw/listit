const categories = require("../db/data/test-data/categories");
const {
  selectCategories,
  selectItems,
  addCategory,
} = require("../models/models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};

exports.getItems = (req, res, next) => {
  selectItems()
    .then((items) => {
      res.status(200).send({ items });
    })
    .catch(next);
};

exports.postCategory = (req, res, next) => {
  const { body } = req;
  addCategory(body)
    .then((category) => {
      res.status(201).send({ category });
    })
    .catch(next);
};
