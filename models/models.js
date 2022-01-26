const db = require("../db/connection");
const format = require("pg-format");
const hi = "in model!";
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

exports.addCategory = (category) => {
  return db
    .query(
      `INSERT INTO categories (category, has_current) VALUES ($1, $2) RETURNING *`,
      [category.category, category.has_current]
    )
    .then((res) => res.rows[0]);
};
