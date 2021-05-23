"use strict";

const tableName = "comment_likes";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.DOUBLE,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      comment_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "photo_comments", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      photo_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "photos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName);
  },
};
