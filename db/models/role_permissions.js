'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolePermissions = sequelize.define('RolePermissions', {
    roleId: {
      field: 'role_id',
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    permissionId: {
      field: 'permission_id',
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Permission',
        key: 'id'
      }
    }
  }, {
    tableName: 'role_permissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  RolePermissions.associate = function(models) {
  };
  return RolePermissions;
};