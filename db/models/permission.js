'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'permissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Permission.associate = function({ Permission, Role, RolePermissions, PolicyAccessControl, PolicyAccessControlPermissions  }) {
    Permission.belongsToMany(Role, { as: 'roles', through: RolePermissions, foreignKey: 'permissionId'});
    Permission.belongsToMany(PolicyAccessControl, { as: 'policies', through: PolicyAccessControlPermissions, foreignKey: 'permissionId' });
  };
  return Permission;
};