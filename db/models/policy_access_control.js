'use strict';
module.exports = (sequelize, DataTypes) => {
  const PolicyAccessControl = sequelize.define('PolicyAccessControl', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false
    },
    httpMethod: {
      field: 'http_method',
      type: DataTypes.ENUM('GET', 'POST', 'PUT', 'PATCH', 'DELETE'),
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    tableName: 'policy_access_controls',
    timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  });
  PolicyAccessControl.associate = function({ PolicyAccessControl, Permission, PolicyAccessControlPermissions}) {
    PolicyAccessControl.belongsToMany(Permission, { as: 'permissions', through: PolicyAccessControlPermissions, foreignKey: 'policyAccessControlId' });
  };
  return PolicyAccessControl;
};