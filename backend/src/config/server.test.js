const server = require("./server");
const request = require("supertest");
const ExternalApiController = require("../controller/externalApiController");
const axios = require("axios");
const ExternalApiServices = require("../services/externalApiServices");
const params = {
  getMovieRoute: /movie/,
};


describe("route not found", () => {
  test("not found for site 404", async () => {
    const app = server({
      ExternalApiController,
      ExternalApiServices,
      axios,
      params,
    });
    const resp = await request(app).get("/no-such-path");
    expect(resp.statusCode).toEqual(404);
  });
});
