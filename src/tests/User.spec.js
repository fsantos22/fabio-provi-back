const request = require("supertest");
const app = require("../server");

let testToken = null;
beforeAll(async (done) => {
  const response = await request(app).post("/auth/login").send({
    email: "teste@provi.com",
    password: "123456"
  });
    testToken = response.body.token
    done()
});

describe("logout", () => {
  it("Should throw Error if user token is not provided", async (done) => {
    expect.assertions(2);
    const res = await request(app).put("/auth/logout");
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "User is not logged");
   
    done();
  });

  it("Success", async (done) => {
    expect.assertions(2);
    const res = await request(app)
      .put("/auth/logout")
      .set("Authorization", `Bearer ${testToken}`);
       
    expect(res.statusCode).toEqual(201);
    expect(res.text).toContain("Logged out");
    done();
  });
});

describe("User informations", () => {
  it("Should throw Error if user token is not provided", async (done) => {
    expect.assertions(2);
    const res = await request(app).get("/users/profile");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error", "jwt must be provided");
    done();
  });

  it("Success", async (done) => {
    expect.assertions(2);
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", testToken);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    done();
  });

  it("Should throw Error if user token is not provided", async (done) => {
    expect.assertions(2);
    const res = await request(app).get("/users/sessions");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error", "jwt must be provided");
    done();
  });

  it("Success", async (done) => {
    expect.assertions(2);
    const res = await request(app)
      .get("/users/sessions")
      .set("Authorization", testToken);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    done();
  });
});

module.exports = { testToken };
