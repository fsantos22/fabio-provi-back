"use strict";
const { v4: uuidv4 } = require("uuid");

const tableName = "photo_comments";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
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
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
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
