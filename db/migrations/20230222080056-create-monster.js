'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('monsters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_path: Sequelize.STRING,
      file_id: Sequelize.BIGINT,
      class: {
        type: Sequelize.ENUM('Diving Monster', 'Flying Monster', 'Insect Monster', 'Fire Monster', 'Water Monster', 'Electric Monster', 'Psychic Monster', 'Grass Monster'),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      size: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      attack: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      defense: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      speed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('monsters');
  }
};