"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      title: {
        type: Sequelize.STRING,
      },
      release_year: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
      runtime: {
        type: Sequelize.INTEGER,
      },
      country_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Countries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      moviesUrl_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "MovieUrls",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      genre_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Genres",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      img_url: {
        type: Sequelize.STRING,
      },
      trailer_url: {
        type: Sequelize.STRING,
      },
      directors: {
        type: Sequelize.STRING,
      },
      actor: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movies");
  },
};
