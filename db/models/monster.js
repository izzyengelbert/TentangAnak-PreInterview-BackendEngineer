'use strict';
module.exports = (sequelize, DataTypes) => {
  const monster = sequelize.define('Monster', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filePath: {
      field: 'file_path',
      type: DataTypes.STRING
    },
    fileId: {
      field: 'file_id',
      type: DataTypes.BIGINT
    },
    class: {
      type: DataTypes.ENUM('Diving Monster', 'Flying Monster', 'Insect Monster', 'Fire Monster', 'Water Monster', 'Electric Monster', 'Psychic Monster', 'Grass Monster'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'monsters',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  monster.associate = function({ Monster, Type, MonsterTypes, UserMonsters, User }) {
    Monster.belongsToMany(Type, { as: 'types', through: MonsterTypes, foreignKey: 'monsterId' });
    Monster.belongsToMany(User, { as: 'users', through: UserMonsters, foreignKey: 'monsterId' });
  };
  return monster;
};