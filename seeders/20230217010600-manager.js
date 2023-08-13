'use strict';
const { faker } = require('@faker-js/faker');
const { Manager, JobTitle } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const jobTitles = await JobTitle.findAll({ attributes: ['id'] });
    const managers = [];
    for (let i = 0; i < 30; i++) {
      let card_id;
      do {
        card_id = faker.datatype.uuid();
        const existingManager = await Manager.findOne({ where: { card_id: card_id } });
        if (existingManager) {
          card_id = null;
        }
      } while (!card_id);
      managers.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        card_id: card_id,
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number('+963#########'),
        city: faker.address.city(),
        region: faker.address.state(),
        street: faker.address.street(),
        near_by: faker.address.secondaryAddress(),
        job_title_id: jobTitles[Math.floor(Math.random() * jobTitles.length)].id,
        manager_id: i > 0 ? Math.floor(Math.random() * i + 1) : null,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    try {
      await queryInterface.bulkInsert('managers', managers);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
