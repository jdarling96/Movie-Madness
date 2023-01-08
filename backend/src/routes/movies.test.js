const server = require("../config/server");
const request = require("supertest");
const ExternalApiController = require("../controller/externalApiController");
const {NotFoundError} = require("../services/expressErrorServices")
const ExternalApiServices = require("../services/externalApiServices");
const params = {
  getMovieRoute: /movie/,
};

describe("/movies/:id => success", () => {
  let axios = {
    get: () => Promise.resolve({ data: "Success" }),
  };
  let app;

  beforeEach(() => {
    app = server({
      ExternalApiController,
      ExternalApiServices,
      axios,
      params,
    });
  });

  test("should return a 200", async () => {
    return await request(app).get(`/movies/${50}`).expect(200);
  });
});

describe("/movies/:id => success", () => {
    let axios = {
      get: () => Promise.reject(new NotFoundError("Movie not found in external API!")),
    };
    let app;
  
    beforeEach(() => {
      app = server({
        ExternalApiController,
        ExternalApiServices,
        axios,
        params,
      });
    });
  
    test("should return a 404", async () => {
      return await request(app).get(`/movies/${0}`).expect(404);
    });
  });
