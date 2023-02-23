'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('policy_access_control_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      policy_access_control_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'policy_access_controls',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      permission_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'permissions',
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

    await queryInterface.addConstraint('policy_access_control_permissions', {
      fields: ['policy_access_control_id', 'permission_id'],
      type: 'unique',
      name: 'policy_access_control_permission_unique'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('policy_access_control_permissions');
  }
};