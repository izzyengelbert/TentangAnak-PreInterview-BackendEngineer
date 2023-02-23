'use strict';
const bcrypt = require('bcrypt');

const hashPassword = (password, saltRounds = 10) => bcrypt.hash(password, saltRounds);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      const roles = await queryInterface.rawSelect('roles', {
        where: {
          name: {
            [Sequelize.Op.in]: ['Admin', 'User']
          }
        },
        plain: false,
        transaction
      }, ['name', 'id']);
      const adminRole = roles.find(v => v.name === 'Admin')
      const userRole = roles.find(v => v.name === 'User')
      const password = await hashPassword('password')
      await queryInterface.bulkInsert('user_account', [
        {
          username: 'admin',
          password,
          role_id: adminRole.id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'user',
          password,
          role_id: userRole.id,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_account', null, {});
  }
};
