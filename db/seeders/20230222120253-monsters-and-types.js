'use strict';
const fs = require('fs');
const mime = require('mime')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      const filePathOne = __dirname + '/../../resources/images/char-pikachu.png'
      const filePathTwo = __dirname + '/../../resources/images/eevee.png'
      const filePathThree = __dirname + '/../../resources/images/snorlax.jpg'
      const fileOne = fs.readFileSync(__dirname + '/../../resources/images/char-pikachu.png')
      const fileTwo = fs.readFileSync(__dirname + '/../../resources/images/eevee.png')
      const fileThree = fs.readFileSync(__dirname + '/../../resources/images/snorlax.jpg')

      const files = [
        { buffer: fileOne, filename: 'char-pikachu.png', mimetype: mime.getType(filePathOne), created_at: new Date(), updated_at: new Date() },
        { buffer: fileTwo, filename: 'eevee.png', mimetype: mime.getType(filePathTwo), created_at: new Date(), updated_at: new Date() },
        { buffer: fileThree, filename: 'snorlax.jpg', mimetype: mime.getType(filePathThree), created_at: new Date(), updated_at: new Date() }
      ]
      const fileIds = (await queryInterface.bulkInsert('files', files, { returning: ['id'], transaction })).map(v => v.id);

      // monsters seed data
      const monsters = [
        {
          name: 'Charizard',
          file_path: `http://localhost:3000/files/${fileIds[0]}`,
          file_id: fileIds[0],
          class: 'Fire Monster',
          description: 'A dragon-like creature with fiery breath',
          size: 1.7,
          weight: 90.5,
          hp: 78,
          attack: 84,
          defense: 78,
          speed: 100,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Blastoise',
          file_path: `http://localhost:3000/files/${fileIds[1]}`,
          file_id: fileIds[1],
          class: 'Water Monster',
          description: 'A turtle-like creature with water cannons on its back',
          size: 1.6,
          weight: 85.5,
          hp: 79,
          attack: 83,
          defense: 100,
          speed: 78,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Pikachu',
          file_path: `http://localhost:3000/files/${fileIds[2]}`,
          file_id: fileIds[2],
          class: 'Electric Monster',
          description: 'A small, yellow, mouse-like creature with electrical powers',
          size: 0.4,
          weight: 6.0,
          hp: 35,
          attack: 55,
          defense: 30,
          speed: 90,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      const monsterIds = (await queryInterface.bulkInsert('monsters', monsters, { returning: ['id'], transaction })).map(v => v.id);

      const types = [
        { name: 'grass', created_at: new Date(), updated_at: new Date() },
        { name: 'psychic', created_at: new Date(), updated_at: new Date() },
        { name: 'flying', created_at: new Date(), updated_at: new Date() },
        { name: 'fire', created_at: new Date(), updated_at: new Date() },
        { name: 'water', created_at: new Date(), updated_at: new Date() },
        { name: 'electric', created_at: new Date(), updated_at: new Date() },
        { name: 'bug', created_at: new Date(), updated_at: new Date() }
      ]

      const typeIds = (await queryInterface.bulkInsert('types', types, { returning: ['id'], transaction })).map(v => v.id);

      // monster_types seed data
      const monsterTypes = [
        { monster_id: monsterIds[0], type_id: typeIds[4], created_at: new Date(), updated_at: new Date() },
        { monster_id: monsterIds[1], type_id: typeIds[5], created_at: new Date(), updated_at: new Date() },
        { monster_id: monsterIds[2], type_id: typeIds[6], created_at: new Date(), updated_at: new Date() },
        { monster_id: monsterIds[0], type_id: typeIds[2], created_at: new Date(), updated_at: new Date() },
        { monster_id: monsterIds[0], type_id: typeIds[3], created_at: new Date(), updated_at: new Date() },
        { monster_id: monsterIds[1], type_id: typeIds[1], created_at: new Date(), updated_at: new Date() },
        { monster_id: monsterIds[1], type_id: typeIds[3], created_at: new Date(), updated_at: new Date() },
        { monster_id: monsterIds[2], type_id: typeIds[0], created_at: new Date(), updated_at: new Date() },
      ];

      await queryInterface.bulkInsert('monster_types', monsterTypes, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('types', null, {});
    await queryInterface.bulkDelete('monsters', null, {});
    await queryInterface.bulkDelete('monster_types', null, {});
  }
};
