const request = require("supertest");
const User = require("../models/User");
const app = require("../server");

describe("Sign in", () => {
  it("Should throw error when name is missing or empty", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/users/signin").send({
      name: "",
      email: "teste@provi.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error","Missing input");
    done();
  });

  it("Should throw error when e-mail is missing or empty", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/users/signin").send({
      name: "teste",
      email: "",
      password: "123456",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error","Missing input");
    done();
  });

  it("Should throw error when password is missing or empty", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/users/signin").send({
      name: "teste",
      email: "teste@provi.com",
      password: "",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error","Missing input");
    done();
  });

  it("Should throw error when password schema is invalid", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/users/signin").send({
      name: "teste",
      email: "teste@provi.com",
      password: "12*/3Abc",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error","Invalid password schema");
    done();
  });

  it("Should throw error when e-mail schema is invalid", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/users/signin").send({
      name: "teste",
      email: "invalid@email.abcde",
      password: "123456",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error", "Invalid e-mail type");
    done();
  });

  it("Success", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/users/signin").send({
      name: "teste",
      email: "teste2@provi.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    User.destroy({where:{email:"teste2@provi.com"}})
    done();
  });

  it("Should throw error when e-mail is already registered", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/users/signin").send({
      name: "teste",
      email: "teste@provi.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("error","E-mail already registered");
    // User.destroy({ where: { email: "teste@provi.com" } });
    done();
  });
});

describe("login", () => {
  it("Should throw error when email is missing or empty", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/auth/login").send({
      email: "",
      password: "123456",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error","Missing input");
    done();
  });

  it("Should throw error when email is missing or empty", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/auth/login").send({
      email: "teste@provi.com",
      password: "",
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error","Missing input");
    done();
  });

  it("Should throw error when email is not found in DB", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/auth/login").send({
      email: "teste1234@provi.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error","Invalid Credentials");
    done();
  });

  it("Should throw error when password does not match with hash in DB", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/auth/login").send({
      email: "teste@provi.com",
      password: "123456ABC",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error","Invalid Credentials");
    done();
  });

  it("Success", async (done) => {
    expect.assertions(2);
    const res = await request(app).post("/auth/login").send({
      email: "teste@provi.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    done();
  });
});

