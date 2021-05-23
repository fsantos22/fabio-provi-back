const User = require("../models/User");
const UserSession = require("../models/UserSession");
const Authenticator = require("../services/Authenticator");
const _Error = require("../models/Error");

class UserDatabase {
  async validateCredentials(token) {
    try {
      const auth = new Authenticator();
      const credentials = auth.getData(token);
      if (!credentials.id) {
        throw new _Error(401, "Invalid credentials");
      }
      const { active } = await this.getSessionByToken(token);
      if (!active) {
        throw new _Error(401, "Invalid credentials");
      }
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async createUser(input) {
    try {
      return await User.create(input);
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async createSession(userId, token) {
    try {
      return await UserSession.create({ user_id: userId, token });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new _Error(404, "User not found");
      }
      return user;
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getSessionByToken(token) {
    try {
      return await UserSession.findOne({ where: { token } });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getUserProfile(user_id) {
    try {
      const user = await User.findByPk(user_id, {
        attributes: {
          exclude: ["password"],
        },
      });

      return user.toJSON();
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getUserSessions(user_id) {
    try {
      const user = await User.findByPk(user_id, {
        include: { association: "sessions" },
        attributes: {
          exclude: ["password"],
        },
      });

      return user.toJSON();
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async logout(token) {
    try {
      return await UserSession.update({ active: 0 }, { where: { token } });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }
}

module.exports = UserDatabase;
