const server = require("../config/server");
const request = require("supertest");
const ExternalApiController = require("../controller/externalApiController");
const {NotFoundError, BadRequestError} = require("../services/expressErrorServices")
const ExternalApiServices = require("../services/externalApiServices");
const {params} = require("../config/config")
const utils = {
    createImageFromApiObject (data){return data},
    createImageFromApiArray (data){return data}
}

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
      utils
    });
  });

  test("should return a 200", async () => {
    return await request(app).get(`/movies/${50}`).expect(200);
  });
});

describe("/movies/:id => failure", () => {
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
        utils
      });
    });
  
    test("should return a 404", async () => {
      return await request(app).get(`/movies/${0}`).expect(404);
    });
  });

  describe("/movies/now_playing => success", () => {
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
        utils
      });   
    });
  
    test("should return a 200", async () => {
      return await request(app).get("/movies/now_playing").expect(200)
    });
    
    test("should return a 200", async () => {
        return await request(app).get('/movies/now_playing?page=79').expect(200);
        
      }); 
  });

  describe("/movies/now_playing => failure", () => {
    let axios = {
      get: () => Promise.reject(new BadRequestError("Check API url or query string!")),
    };
    let app;
  
    beforeEach(() => {
      app = server({
        ExternalApiController,
        ExternalApiServices,
        axios,
        params,
        utils
      });
    });
  
    test("should return a 200", async () => {
      return await request(app).get('/movies/now_playing?wow').expect(400);
    });
  });
