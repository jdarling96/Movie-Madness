"use strict";
const server = require("../config/server");
const request = require("supertest");
const QueueController = require("../controller/queueController")
const QueueAndWatchlistModel = require("../models/queueAndWatchlist")
const UserModel = require("../models/user");
const AuthServices = require("../services/authServices")
const {
  UnauthorizedError,
  BadRequestError,
} = require("../expressErrorServices");
const db = require("../db");

const userToken = (() =>{
    const token = AuthServices.createToken({username:'TestUser123'})
    return token
})();

const testUser = {
    username : 'TestUser123',
    password : 'TestUser123',
    email : 'TestUser123@email.com'
}

beforeAll(async () => {
  
  await db.query("BEGIN");
  const createTestUser = new UserModel({...testUser})
  await createTestUser.register()
});

afterAll(async () => {
  await db.end();
});

describe("POST /queue/:username => success", () => {
  let app;

  beforeEach(() => {
    app = server({
      QueueAndWatchlistModel,
      QueueController,
      UserModel,
    });
  });

  test("should return a 201", async () => {
    console.log(userToken)
    const res = await request(app).post("/queue/TestUser123").send({
        id: 75,
        poster: "http://image.tmdb.org/t/p/w185/hll4O5vSAfnZDb6JbnP06GPtz7b.jpg",
        name: "Mars Attacks!"
    })
    .set("authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
        addedToQueue:{
            movieId: 75,
            userId: expect.any(Number),

        }
    });
  });
});

describe("GET /queue/:username => success", () => {
    let app;
  
    beforeEach(() => {
      app = server({
        QueueAndWatchlistModel,
        QueueController,
        UserModel,
      });
    });
    
    test("should return a 200", async () => {
        const res = await request(app).get("/queue/TestUser123")
        .set("authorization", `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            movies: [
                {
                movie_id: 75,
                name: "Mars Attacks!",
                poster_path: "http://image.tmdb.org/t/p/w185/hll4O5vSAfnZDb6JbnP06GPtz7b.jpg",

                }
                

            ]
        });
      });
  });

  describe("DELETE /queue/:username => success", () => {
    let app;
  
    beforeEach(() => {
      app = server({
        QueueAndWatchlistModel,
        QueueController,
        UserModel,
      });
    });
    afterEach(async () => {
      await db.query("ROLLBACK");
    });
  
    test("should return a 200", async () => {
        const res = await request(app).delete("/queue/TestUser123").send({
            id: 75
        })
        .set("authorization", `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            deleteFromQueue: "Movie 75 deleted from queue",
        });
      });
  });






