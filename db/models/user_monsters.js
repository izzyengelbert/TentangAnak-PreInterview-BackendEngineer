'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMonsters = sequelize.define('UserMonsters', {
    userId: {
      field: 'user_id',
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    monsterId: {
      field: 'monster_id',
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Monster',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_monsters',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  UserMonsters.associate = function({ Monster, User }) {
    // associations can be defined here
  };
  return UserMonsters;
};