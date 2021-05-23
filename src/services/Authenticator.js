const jwt = require("jsonwebtoken");

class Authenticator {
  generateToken(input) {
    const token = jwt.sign(
      {
        id: input.id,
        email: input.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );
    return token;
  }

  getData(token) {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const result = {
      id: payload.id,
      email: payload.email,
    };
    return result;
  }
}

module.exports = Authenticator;
