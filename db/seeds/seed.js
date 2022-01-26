const db = require("../connection.js");
const format = require("pg-format");
const { formatData } = require("../utils/data-manipulation.js");

const seed = (data) => {
  const { categoryData, commentData, itemData, userData } = data;
  return db
    .query("DROP TABLE IF EXISTS items;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS categories;");
    })
    .then(() => {
      return db.query(
        "CREATE TABLE categories (id SERIAL PRIMARY KEY, category VARCHAR(25) NOT NULL, has_current BOOLEAN NOT NULL);"
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE items (id SERIAL PRIMARY KEY, item_name VARCHAR(100) NOT NULL, item_link VARCHAR(1000), item_notes VARCHAR(1000), item_location VARCHAR(1000), item_completed BOOLEAN DEFAULT false, category INT REFERENCES categories(id), current BOOLEAN);"
      );
    })
    .then(() => {
      const keys = ["category", "hasCurrent"];
      const formattedCategories = formatData(categoryData, keys);
      const queryString = format(
        "INSERT INTO categories (category, has_current) VALUES %L;",
        formattedCategories
      );
      return db.query(queryString);
    })
    .then(() => {
      const queryString = format("SELECT * FROM categories");
      return db.query(queryString);
    })
    .then(() => {})
    .then(() => {
      const keys = [
        "item_name",
        "item_link",
        "item_notes",
        "item_location",
        "category",
        "current",
        "item_completed",
      ];
      const formattedTopics = formatData(itemData, keys);
      const queryString = format(
        "INSERT INTO items (item_name, item_link, item_notes, item_location, category, current, item_completed) VALUES %L;",
        formattedTopics
      );
      return db.query(queryString);
    })
    .then(() => {
      const queryString = format("SELECT * FROM items");
      return db.query(queryString);
    })
    .then(() => {});
};

module.exports = { seed };
