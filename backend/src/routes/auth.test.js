"use strict";
const server = require("../config/server");
const request = require("supertest");
const ExternalAuthApiController = require("../controller/externalAuthApiController");
const ExternalAuthApiServices = require("../services/externalAuthApiServices");
const AuthController = require("../controller/authController");
const AuthServices = require("../services/authServices");
const UserModel = require("../models/user");
const {
  UnauthorizedError,
  BadRequestError,
} = require("../expressErrorServices");
const db = require("../db");

beforeAll(async () => {
  await db.query("BEGIN");
});
afterAll(async () => {
  await db.end();
});

describe("/auth/register => success", () => {
  let axios = {
    get: () =>
      Promise.resolve({ data: { guest_session_id: "guest_session_key" } }),
  };
  let app;

  beforeEach(() => {
    app = server({
      ExternalAuthApiController,
      ExternalAuthApiServices,
      AuthController,
      AuthServices,
      UserModel,
      axios,
    });
  });
  afterEach(async () => {
    await db.query("ROLLBACK");
  });

  test("should return a 200", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "testpassword",
      email: "testemail@email.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      username: "testuser",
      email: "testemail@email.com",
      guestSession: "guest_session_key",
      token: expect.any(String),
    });
  });
});

describe("/auth/register => failure", () => {
  let axios = {
    get: () =>
      Promise.resolve({ data: { guest_session_id: "guest_session_key" } }),
  };
  let app;

  beforeEach(() => {
    app = server({
      ExternalAuthApiController,
      ExternalAuthApiServices,
      AuthController,
      AuthServices,
      UserModel,
      axios,
    });
  });
  afterEach(async () => {
    await db.query("ROLLBACK");
  });

  test("should return a 400 does not match schema", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "pass",
      email: "testemail@email.com",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: {
        message: ["instance.password does not meet minimum length of 5"],
        status: 400,
      },
    });
  });
});

describe("/auth/register => failure", () => {
  let axios = {
    get: () => Promise.reject(new BadRequestError("Check API url!")),
  };
  let app;

  beforeEach(() => {
    app = server({
      ExternalAuthApiController,
      ExternalAuthApiServices,
      AuthController,
      AuthServices,
      UserModel,
      axios,
    });
  });
  afterEach(async () => {
    await db.query("ROLLBACK");
  });

  test("should return a 400 if external api is rejected", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "testpassword",
      email: "testemail@email.com",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: {
        message: "Check API url!",
        status: 400,
      },
    });
  });
});

describe("/auth/register => success", () => {
  let axios = {
    get: () =>
      Promise.resolve({ data: { guest_session_id: "guest_session_key" } }),
  };
  let app;

  beforeEach(() => {
    app = server({
      ExternalAuthApiController,
      ExternalAuthApiServices,
      AuthController,
      AuthServices,
      UserModel,
      axios,
    });
  });
  afterEach(async () => {
    await db.query("ROLLBACK");
    await db.query("DELETE FROM users");
  });

  test("should return a 400 duplicate user: user already exists", async () => {
    await request(app).post("/auth/register").send({
      username: "testuser",
      password: "testpassword",
      email: "testemail@email.com",
    });
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "testpassword",
      email: "testemail@email.com",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: {
        message: "Duplicate username: testuser",
        status: 400,
      },
    });
  });
});

describe("/auth/token => success", () => {
  let axios = {
    get: () =>
      Promise.resolve({ data: { guest_session_id: "guest_session_key" } }),
  };
  let app;

  beforeEach(async () => {
    app = server({
      ExternalAuthApiController,
      ExternalAuthApiServices,
      AuthController,
      AuthServices,
      UserModel,
      axios,
    });
    let insertUser = new UserModel({
      username: "testuser",
      password: "testpassword",
      email: "testemail@email.com",
    });
    insertUser.setGuestSession("guest_session_key");
    await insertUser.register();
  });
  afterEach(async () => {
    await db.query("ROLLBACK");
    await db.query("DELETE FROM users");
  });

  test("should return a 200 correct username/password ", async () => {
    const res = await request(app).post("/auth/token").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      email: "testemail@email.com",
      guestSession: "guest_session_key",
      token: expect.any(String),
      username: "testuser",
    });
  });
});

describe("/auth/token => failure", () => {
  let axios = {
    get: () =>
      Promise.resolve({ data: { guest_session_id: "guest_session_key" } }),
  };
  let app;

  beforeEach(async () => {
    app = server({
      ExternalAuthApiController,
      ExternalAuthApiServices,
      AuthController,
      AuthServices,
      UserModel,
      axios,
    });
    let insertUser = new UserModel({
      username: "testuser",
      password: "testpassword",
      email: "testemail@email.com",
    });
    insertUser.setGuestSession("guest_session_key");
    await insertUser.register();
  });
  afterEach(async () => {
    await db.query("ROLLBACK");
    await db.query("DELETE FROM users");
  });

  test("should return a 400 does not match schema", async () => {
    const res = await request(app).post("/auth/token").send({
      username: "testuser",
      password: 4578,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: {
        message: ["instance.password is not of a type(s) string"],
        status: 400,
      },
    });
  });
});

describe("/auth/token => failure", () => {
  let axios = {
    get: () =>
      Promise.resolve({ data: { guest_session_id: "guest_session_key" } }),
  };
  let app;

  beforeEach(async () => {
    app = server({
      ExternalAuthApiController,
      ExternalAuthApiServices,
      AuthController,
      AuthServices,
      UserModel,
      axios,
    });
    let insertUser = new UserModel({
      username: "testuser",
      password: "testpassword",
      email: "testemail@email.com",
    });
    insertUser.setGuestSession("guest_session_key");
    await insertUser.register();
  });
  afterEach(async () => {
    await db.query("ROLLBACK");
    await db.query("DELETE FROM users");
  });

  test("should return a 400 username/pass is not valid", async () => {
    const res = await request(app).post("/auth/token").send({
      username: "testuser",
      password: "test",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      error: {
        message: "Invalid username/password",
        status: 401,
      },
    });
  });
  test("should return a 400 username/pass is not valid", async () => {
    const res = await request(app).post("/auth/token").send({
      username: "testuser123",
      password: "testpassword",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      error: {
        message: "Invalid username/password",
        status: 401,
      },
    });
  });
});
