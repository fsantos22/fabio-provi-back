const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

class User extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: () => uuidv4(),
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      { sequelize: connection },
    );
  }

  static associate(models) {
    this.hasMany(models.UserSession, { foreignKey: "user_id", as: "sessions" });
  }
}

module.exports = User;
