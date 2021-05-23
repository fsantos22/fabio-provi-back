const UserBusiness = require("../business/UserBusiness");
const UserDatabase = require("../data/UserDatabase");
const Authenticator = require("../services/Authenticator");

module.exports = {
  async createUser(req, res) {
    try {
      const userBusiness = new UserBusiness();
      const { token } = await userBusiness.createUser(req.body);

      return res.status(201).send({ token });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const userBusiness = new UserBusiness();
      const { token } = await userBusiness.login(req.body);

      return res.status(200).send({ token });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async logout(req, res) {
    try {
      const token = req.headers.authorization;

      const userBusiness = new UserBusiness();
      await userBusiness.logout(token);

      return res.status(201).send({ message: "Logged out" });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async getUserProfile(req, res) {
    try {
      const userBusiness = new UserBusiness();

      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);
      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      const user = await userBusiness.getUserProfile(user_id);

      return res.status(201).send({ user });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async getUserSessions(req, res) {
    try {
      const userBusiness = new UserBusiness();

      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);
      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      const user = await userBusiness.getUserSessions(user_id);

      return res.status(201).send({ user });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },
};
