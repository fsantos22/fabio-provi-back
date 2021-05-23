const { Model, DataTypes } = require("sequelize");

class PhotoLike extends Model {
  static init(connection) {
    super.init(
      {
        photo_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
      },
      { sequelize: connection }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "photo_id", as: "photo" });
  }
  // static associate(models) {
  //   this.belongsToMany(models.User, { foreignKey: "user_id", as: "user" });
  // }
}

module.exports = PhotoLike;
