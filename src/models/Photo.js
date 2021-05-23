const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

class Photo extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: () => uuidv4(),
        },
        url: DataTypes.STRING,
        text: DataTypes.TEXT,
        user_id: DataTypes.STRING,
      },
      { sequelize: connection }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
    this.hasMany(models.PhotoComment, {
      foreignKey: "photo_id",
      as: "comments",
    });
    this.hasMany(models.PhotoComment, {
      foreignKey: "photo_id",
      as: "comment-likes",
    });
    this.hasMany(models.PhotoLike, {
      foreignKey: "photo_id",
      as: "photo-likes",
    });
  }
}

module.exports = Photo;
