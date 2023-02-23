'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { devLogger } =  require('../../utils/common');
const db = { models: {} };

const connect = (config) => {
  let sequelize;
  devLogger('Connecting to database...');
  try {
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
  } catch (error) {
    devLogger('Fail to connect to database:', error.message);
  }
  devLogger('Connected to database.\n');
  devLogger('Generating models...');

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
      db.models[model.name] = model;
      devLogger(`${model.name} model loaded.`);
    });
  
  Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
      db.models[modelName].associate(db.models);
      devLogger(`${modelName} model associated.`);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db
}

module.exports = {
  connect
};
