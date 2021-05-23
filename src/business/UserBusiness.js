const UserDatabase = require("../data/UserDatabase");
const HashManager = require("../services/HashManager");
const Authenticator = require("../services/authenticator");
const _Error = require("../models/Error");
const UserSession = require("../models/UserSession");
const InputValidation = require('../services/InputValidation')

class UserBusiness {
  async createUser(input) {
    try {
      const validation = new InputValidation();
      const userDb = new UserDatabase();
      const { name, email, password } = input;

      if (!name || !email || !password) {
        throw new _Error(422, "Missing input");
      }

      validation.isEmail(email);
      validation.isValidPassword(password);

      const findEmail = await userDb.getUserByEmail(email);
      if (findEmail) {
        throw new _Error(409, "E-mail already registered");
      }

      const hash = new HashManager();
      const hashPass = await hash.hash(password);

      const user = await userDb.createUser({ name, email, password: hashPass });

      const auth = new Authenticator();
      const token = auth.generateToken(user);

      await userDb.createSession(user.id, token);

      return { token };
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async login(input) {
    try {
      const userDb = new UserDatabase();
      const { email, password } = input;

      if(!email || !password) {
        throw new _Error(422, "Missing input");
      }

      const user = await userDb.getUserByEmail(email);
      if (!user) {
        throw new _Error(401, "Invalid Credentials");
      }

      const hash = new HashManager();
      const checkPass = await hash.compare(password, user.password);
      if (!checkPass) {
        throw new _Error(401, "Invalid Credentials");
      }

      const auth = new Authenticator();
      const token = auth.generateToken(user);

      await userDb.createSession(user.id, token);

      return { token };
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async logout(token) {
    try {
      if(!token){
        throw new _Error(401, "User is not logged")
      }
      const userDb = new UserDatabase();
      await userDb.logout(token);
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getUserProfile(user_id) {
    try {
      const userDb = new UserDatabase();
      const user = await userDb.getUserProfile(user_id);

      return user;
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getUserSessions(user_id) {
    try {
      const userDb = new UserDatabase();
      const user = await userDb.getUserSessions(user_id);

      return user;
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }
}

module.exports = UserBusiness;
