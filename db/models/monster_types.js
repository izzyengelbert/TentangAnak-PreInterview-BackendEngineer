'use strict';
module.exports = (sequelize, DataTypes) => {
  const monster_types = sequelize.define('MonsterTypes', {
    typeId: {
      field: 'type_id',
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'types',
        key: 'id'
      }
    },
    monsterId: {
      field: 'monster_id',
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'monsters',
        key: 'id'
      }
    },
  }, {
    tableName: 'monster_types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  monster_types.associate = function(models) {
    // associations can be defined here
  };
  return monster_types;
};