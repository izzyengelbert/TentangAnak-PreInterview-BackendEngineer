'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      const policies = [
        { http_method: 'GET', route: '/users/', enabled: true, created_at: new Date(), updated_at: new Date() },
        { http_method: 'GET', route: '/users/:id', enabled: true, created_at: new Date(), updated_at: new Date() }
      ]
      const policyIds = (await queryInterface.bulkInsert('policy_access_controls', policies, { returning: ['id'], transaction })).map(v => v.id);
      const permissions = await queryInterface.rawSelect('permissions', {
        where: {
          name: {
            [Sequelize.Op.in]: ['read_user']
          }
        },
        plain: false,
        transaction
      }, ['name', 'id']);
  
      const pacPermmissions = [
        { policy_access_control_id: policyIds[0], permission_id: permissions[0].id, created_at: new Date(), updated_at: new Date() },
        { policy_access_control_id: policyIds[1], permission_id: permissions[0].id, created_at: new Date(), updated_at: new Date() }
      ]
        
      await queryInterface.bulkInsert('policy_access_control_permissions', pacPermmissions, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('policy_access_controls', { route: ['/users/','/users/:id'] }, {});
  }
};
