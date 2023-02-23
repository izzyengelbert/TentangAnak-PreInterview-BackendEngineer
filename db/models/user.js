'use strict';
const { hashPassword } = require('../../utils/password');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    roleId: {
      field: 'role_id',
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(15),
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'User',
    tableName: 'user_account',
    hooks: {
      async beforeCreate(user) {
        user.password = await hashPassword(user.password);
      }
    }
  });
  User.associate = function({ User, Role, Monster, UserMonsters }) {
    User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });
    User.belongsToMany(Monster, { as: 'monsters', through: UserMonsters, foreignKey: 'userId' });

  };
  User.findUserByCredentials = function(username) {
    return User.findOne({
      where: {
        username
      },
      include: {
        as: 'role',
        model: sequelize.models.Role,
        required: true
      }
    });
  }

  User.findUserById = function(id) {
    return User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    });
  }

  User.findUserByUsername = function(username) {
    return User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
  }
  return User;
};