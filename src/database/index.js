const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require('../models/User')
const UserSession = require("../models/UserSession");
const Photo = require("../models/Photo");
const PhotoLike = require("../models/PhotoLike");
const PhotoComment = require("../models/PhotoComment");
const CommentLike = require("../models/CommentLike");

const connection = new Sequelize(dbConfig);

User.init(connection)
UserSession.init(connection);
Photo.init(connection);
PhotoComment.init(connection);
PhotoLike.init(connection);
CommentLike.init(connection);

User.associate(connection.models);
UserSession.associate(connection.models);
Photo.associate(connection.models);
PhotoComment.associate(connection.models);
PhotoLike.associate(connection.models);
CommentLike.associate(connection.models);

module.exports = connection;
