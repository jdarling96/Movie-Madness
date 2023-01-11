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
    const res = await request(app).get(`/movies/${50}`).expect(200);
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual("Success")
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
        return await request(app).get("/movies/now_playing?page=1").expect(200)
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
  
    test("should return a 400", async () => {
      return await request(app).get('/movies/now_playing?wow').expect(400);
    });
    test("should return a 400", async () => {
        return await request(app).get('/movies/now_playing?page=1000').expect(400);
      });
  });

  describe("/movies/popular => success", () => {
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
      return await request(app).get("/movies/popular").expect(200)
    });
    test("should return a 200", async () => {
        return await request(app).get("/movies/popular?page=1").expect(200)
      });
     
  });

  describe("/movies/popular=> failure", () => {
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
  
    test("should return a 400", async () => {
      return await request(app).get('/movies/popular?wow').expect(400);
    });
    test("should return a 400", async () => {
        return await request(app).get('/movies/popular?page=1000').expect(400);
      });
  });

  describe("/movies/top_rated => success", () => {
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
      return await request(app).get("/movies/top_rated").expect(200)
    });
    test("should return a 200", async () => {
        return await request(app).get("/movies/top_rated?page=1").expect(200)
      });
     
  });

  describe("/movies/top_rated => failure", () => {
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
  
    test("should return a 400", async () => {
      return await request(app).get('/movies/top_rated?wow').expect(400);
    });
    test("should return a 400", async () => {
        return await request(app).get('/movies/top_rated?page=1000').expect(400);
      });
  });

  describe("/movies/upcoming => success", () => {
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
      return await request(app).get("/movies/upcoming").expect(200)
    });
    test("should return a 200", async () => {
        return await request(app).get("/movies/upcoming?page=1").expect(200)
      });
     
  });

  describe("/movies/top_rated => failure", () => {
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
  
    test("should return a 400", async () => {
      return await request(app).get('/movies/upcoming?wow').expect(400);
    });
    test("should return a 400", async () => {
        return await request(app).get('/movies/upcoming?page=1000').expect(400);
      });
  });
