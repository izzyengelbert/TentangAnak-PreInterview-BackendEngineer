'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monster_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      type_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      monster_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'monsters',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await queryInterface.addConstraint('monster_types', {
      fields: ['monster_id', 'type_id'],
      type: 'unique',
      name: 'monster_type_unique'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('monster_types');
  }
};