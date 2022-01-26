const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");
const { seed } = require("../db/seeds/seed");

beforeEach(() => seed(testData));

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

describe("/api/categories", () => {
  describe("GET", () => {
    test("200: should respond with an array of categories", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body.categories).toHaveLength(4);
          body.categories.forEach((category) => {
            expect.objectContaining({
              category: expect.any(String),
              has_current: expect.any(Boolean),
            });
          });
        });
    });
  });
});
