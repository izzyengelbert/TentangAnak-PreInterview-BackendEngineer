'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      // Insert roles
      const roles = [
        { name: 'Admin', created_at: new Date(), updated_at: new Date() },
        { name: 'User', created_at: new Date(), updated_at: new Date() },
      ];

      const roleIds = (await queryInterface.bulkInsert('roles', roles, {
        returning: ['id'],
        transaction,
      })).map(v => v.id);

      // Insert permissions
      const permissions = [
        { name: 'create_monster', created_at: new Date(), updated_at: new Date() },
        { name: 'read_monster', created_at: new Date(), updated_at: new Date() },
        { name: 'update_monster', created_at: new Date(), updated_at: new Date() },
        { name: 'delete_monster', created_at: new Date(), updated_at: new Date() },
        { name: 'read_user', created_at: new Date(), updated_at: new Date() },
        { name: 'update_user', created_at: new Date(), updated_at: new Date() },
        { name: 'delete_user', created_at: new Date(), updated_at: new Date() },
        { name: 'catch_monster', created_at: new Date(), updated_at: new Date() },
      ];

      const permissionIds = (await queryInterface.bulkInsert('permissions', permissions, {
        returning: ['id'],
        transaction,
      })).map(v => v.id);

      // Insert role_permissions
      const rolePermissions = [
        // Admin role has all permissions
        { role_id: roleIds[0], permission_id: permissionIds[0], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[0], permission_id: permissionIds[1], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[0], permission_id: permissionIds[2], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[0], permission_id: permissionIds[3], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[0], permission_id: permissionIds[4], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[0], permission_id: permissionIds[5], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[0], permission_id: permissionIds[6], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[0], permission_id: permissionIds[7], created_at: new Date(), updated_at: new Date() },
        // User role has limited permissions
        { role_id: roleIds[1], permission_id: permissionIds[1], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[1], permission_id: permissionIds[4], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[1], permission_id: permissionIds[5], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[1], permission_id: permissionIds[6], created_at: new Date(), updated_at: new Date() },
        { role_id: roleIds[1], permission_id: permissionIds[7], created_at: new Date(), updated_at: new Date() },
      ];

      await queryInterface.bulkInsert('role_permissions', rolePermissions, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
  }
};
