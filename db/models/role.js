'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Role.associate = function({ Role, Permission, RolePermissions }) {
    Role.belongsToMany(Permission, { as: 'permissions', through: RolePermissions, foreignKey: 'roleId' });
  };
  return Role;
};