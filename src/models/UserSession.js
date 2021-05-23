const { Model, DataTypes } = require("sequelize");

class UserSession extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.STRING,
        token: DataTypes.STRING,
        active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      { sequelize: connection }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: 'user' });
  }
}

module.exports = UserSession;
