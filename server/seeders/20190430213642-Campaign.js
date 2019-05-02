'use strict';
const models = require('../models');
const Campaign = models.Campaign;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      queryInterface.bulkInsert('Campaigns', [{
        name: 'Cabelo Sedoso',
        description: 'Campanha de Demonstração para a Cabelo Sedoso',
        hashtag: '#maisShampooSedoso',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      const _campaign = await Campaign.findOne({
        where: {
          name: 'Cabelo Sedoso'
        }
      });

      return await queryInterface.bulkInsert('Items', [
        {name: 'Maça', hashtag: '#maça' , campaign_id: _campaign.id, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Pera', hashtag: '#Pera' , campaign_id:  _campaign.id, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Cabelos Lisos', hashtag: '#cabeloslisos' , campaign_id:  _campaign.id, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Rosas', hashtag: '#rosas' , campaign_id:  _campaign.id, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      await queryInterface.bulkDelete('Items', null, {});
      await queryInterface.bulkDelete('Campaigns', null, {});
  }
};
