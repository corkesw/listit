const db = require("../connection.js");
const format = require("pg-format");
const { formatData } = require("../utils/data-manipulation.js");

const seed = (data) => {
  const { categoryData, commentData, topicData, userData } = data;
  return db
    .query("DROP TABLE IF EXISTS items;")
    .then(() => {
      console.log("dropped items");
      return db.query("DROP TABLE IF EXISTS categories;");
    })
    .then(() => {
      console.log("dropped categories");
      return db.query(
        "CREATE TABLE categories (id SERIAL PRIMARY KEY, category VARCHAR(25) NOT NULL);"
      );
    })
    .then(() => {
      console.log("created categories");
      return db.query(
        "CREATE TABLE items (id SERIAL PRIMARY KEY, item_name VARCHAR(100) NOT NULL, item_link VARCHAR(1000), item_notes VARCHAR(1000), item_location VARCHAR(1000), item_completed BOOLEAN DEFAULT false, category INT REFERENCES categories(id));"
      );
    })
    .then(() => {
      console.log("created items");
      const keys = ["category"];
      const formattedCategories = formatData(categoryData, keys);
      const queryString = format(
        "INSERT INTO categories (category) VALUES %L;",
        formattedCategories
      );
      return db.query(queryString);
    })
    .then(() => {
      const queryString = format("SELECT * FROM categories");
      return db.query(queryString);
    })
    .then((res) => {
      console.log(res.rows);
    });
  // .then(() => {
  //   const keys = ["slug", "description"];
  //   const formattedTopics = formatData(topicData, keys);
  //   const queryString = format(
  //     "INSERT INTO topics (slug, description) VALUES %L;",
  //     formattedTopics
  //   );
  //   return db.query(queryString);
  // })
  // .then(() => {
  //   const keys = ["title", "body", "votes", "topic", "author", "created_at"];
  //   const formattedArticles = formatData(articleData, keys);
  //   const queryString = format(
  //     "INSERT INTO articles (title, body, votes, topic, author, created_at) VALUES %L;",
  //     formattedArticles
  //   );
  //   return db.query(queryString);
  // })
  // .then(() => {
  //   const keys = ["author", "article_id", "votes", "created_at", "body"];
  //   const formattedComments = formatData(commentData, keys);
  //   const queryString = format(
  //     "INSERT INTO comments (author, article_id, votes, created_at, body) VALUES %L;",
  //     formattedComments
  //   );
  //   return db.query(queryString);
  // });
};

module.exports = { seed };
