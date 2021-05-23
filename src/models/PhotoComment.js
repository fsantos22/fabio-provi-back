const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

class PhotoComment extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: () => uuidv4(),
        },
        photo_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        text: DataTypes.TEXT,
      },
      { sequelize: connection }
    );
  }
  static associate(models) {
    this.belongsTo(models.Photo, { foreignKey: "photo_id", as: "photo" });
    this.hasMany(models.CommentLike, { foreignKey: "comment_id", as: "comment-likes" });
  }
}

module.exports = PhotoComment;
