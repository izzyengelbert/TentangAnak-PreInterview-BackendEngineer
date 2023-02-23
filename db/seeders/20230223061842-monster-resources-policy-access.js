'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      const policies = [
        { http_method: 'GET', route: '/monsters/', enabled: false, created_at: new Date(), updated_at: new Date() },
        { http_method: 'POST', route: '/monsters/', enabled: true, created_at: new Date(), updated_at: new Date() },
        { http_method: 'GET', route: '/monsters/:id', enabled: false, created_at: new Date(), updated_at: new Date() },
        { http_method: 'PUT', route: '/monsters/:id', enabled: true, created_at: new Date(), updated_at: new Date() },
        { http_method: 'PUT', route: '/monsters/:id/catch', enabled: true, created_at: new Date(), updated_at: new Date() },
        { http_method: 'DELETE', route: '/monsters/:id', enabled: true, created_at: new Date(), updated_at: new Date() },
      ]
      const policyIds = (await queryInterface.bulkInsert('policy_access_controls', policies, { returning: ['id'], transaction })).map(v => v.id);
      const permissions = await queryInterface.rawSelect('permissions', {
        where: {
          name: {
            [Sequelize.Op.in]: [
              'create_monster',
              'read_monster',
              'update_monster',
              'delete_monster',
              'catch_monster',
            ]
          }
        },
        plain: false,
        transaction
      }, ['name', 'id']);
  
      const pacPermmissions = [
        { policy_access_control_id: policyIds[0], permission_id: permissions.find(v => v.name === 'read_monster').id, created_at: new Date(), updated_at: new Date() },
        { policy_access_control_id: policyIds[1], permission_id: permissions.find(v => v.name === 'create_monster').id, created_at: new Date(), updated_at: new Date() },
        { policy_access_control_id: policyIds[2], permission_id: permissions.find(v => v.name === 'read_monster').id, created_at: new Date(), updated_at: new Date() },
        { policy_access_control_id: policyIds[3], permission_id: permissions.find(v => v.name === 'update_monster').id, created_at: new Date(), updated_at: new Date() },
        { policy_access_control_id: policyIds[4], permission_id: permissions.find(v => v.name === 'catch_monster').id, created_at: new Date(), updated_at: new Date() },
        { policy_access_control_id: policyIds[5], permission_id: permissions.find(v => v.name === 'delete_monster').id, created_at: new Date(), updated_at: new Date() }
      ]
        
      await queryInterface.bulkInsert('policy_access_control_permissions', pacPermmissions, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('policy_access_controls', 
      {
        route: ['/monsters/', '/monsters/:id', '/monsters/:id/catch']
      },
      {}
    );
  }
};
