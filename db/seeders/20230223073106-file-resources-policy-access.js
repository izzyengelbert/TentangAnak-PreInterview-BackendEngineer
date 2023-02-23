'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      const policies = [
        { http_method: 'GET', route: '/files/', enabled: false, created_at: new Date(), updated_at: new Date() },
        { http_method: 'GET', route: '/files/:id', enabled: false, created_at: new Date(), updated_at: new Date() }
      ]
      await queryInterface.bulkInsert('policy_access_controls', policies, { returning: ['id'], transaction })
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('policy_access_controls', { route: ['/files/','/files/:id'] },  {});
  }
};
