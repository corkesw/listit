const db = require("../db/connection");
const format = require("pg-format");

exports.selectCategories = () => {
  return db
    .query(
      `
    SELECT * FROM categories`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectItems = () => {
  return db
    .query(
      `
  SELECT * FROM items`
    )
    .then(({ rows }) => {
      return rows;
    });
};
