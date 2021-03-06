const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data");
const { seed } = require("../db/seeds/seed");

beforeEach(() => seed(testData));

afterAll(() => db.end());

expect.extend({
  toBeNullOrType(received, type) {
    if (typeof received === type || received === null) {
      return {
        pass: true,
      };
    } else
      return {
        message: () =>
          `expected ${received} to be typeof ${type} or to be null`,
        pass: false,
      };
  },
});

describe("/notandendpoint", () => {
  describe("ALL", () => {
    test("404 : should return 404 for non-existent endpoint", () => {
      return request(app)
        .get("/notanedpoint")
        .expect(404)
        .then(({ body }) =>
          expect(body.msg).toBe("That's not an endpoint you 'nana!")
        );
    });
  });
});

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
            expect(category).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                category: expect.any(String),
                has_current: expect.any(Boolean),
              })
            );
          });
        });
    });
  });
  describe("POST", () => {
    test.only("201: should respond with the posted item", () => {
      return request(app)
        .post("/api/categories")
        .send({ category: "bananas", has_current: true })
        .expect(201)
        .then(({ body }) => {
          expect(body.category).toEqual({
            category: "bananas",
            has_current: true,
            id: 5,
          });
        });
    });
  });
});

describe("/api/items", () => {
  describe("GET", () => {
    test("200: should return all items", () => {
      return request(app)
        .get("/api/items")
        .expect(200)
        .then(({ body }) => {
          expect(body.items).toHaveLength(4);
          body.items.forEach((item) => {
            expect(item).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                item_name: expect.any(String),
                item_link: expect.toBeNullOrType("string"),
                item_notes: expect.toBeNullOrType("string"),
                item_location: expect.toBeNullOrType("string"),
                item_completed: expect.any(Boolean),
                category: expect.any(Number),
                current: expect.toBeNullOrType("boolean"),
              })
            );
          });
        });
    });
  });
});
