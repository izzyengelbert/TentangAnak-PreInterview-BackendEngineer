'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING
  }, {
    tableName: 'types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Type.associate = function({ Monster, Type, MonsterTypes }) {
    Type.belongsToMany(Monster, { as: 'monsters', through: MonsterTypes, foreignKey: 'typeId' });
  };
  return Type;
};