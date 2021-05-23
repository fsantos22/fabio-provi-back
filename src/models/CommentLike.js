const { Model, DataTypes } = require("sequelize");

class CommentLike extends Model {
  static init(connection) {
    super.init(
      {
        comment_id: DataTypes.STRING,
        photo_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
      },
      { sequelize: connection }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "comment_id", as: "comment" });
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "photo_id", as: "photo" });
  }
}

module.exports = CommentLike;
