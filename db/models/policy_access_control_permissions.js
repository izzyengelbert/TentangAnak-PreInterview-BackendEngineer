'use strict';
module.exports = (sequelize, DataTypes) => {
  const PolicyAccessControlPermissions = sequelize.define('PolicyAccessControlPermissions', {
    policyAccessControlId: {
      field: 'policy_access_control_id',
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'policy_access_controls',
        key: 'id'
      }
    },
    permissionId: {
      field: 'permission_id',
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'permissions',
        key: 'id'
      }
    },
  }, {
    tableName: 'policy_access_control_permissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  PolicyAccessControlPermissions.associate = function(models) {
    // associations can be defined here
  };
  return PolicyAccessControlPermissions;
};