const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");

afterAll(() => db.end());

describe("/api", () => {
  describe("GET", () => {
    test("200: should respond with welcome message ", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).toBe("Welcome");
        });
    });
  });
});
