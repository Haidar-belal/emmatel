'use strict';
const { faker } = require('@faker-js/faker');
const { Manager, JobTitle } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = [];
    const managers = await Manager.findAll({ attributes: ['id'] });
    const jobTitles = await JobTitle.findAll({ attributes: ['id'] });
    for (let i = 0; i < 60; i++) {
      let card_id;
      do {
        card_id = faker.datatype.uuid();
        const existingManager = await Manager.findOne({ where: { card_id: card_id } });
        if (existingManager) {
          card_id = null;
        }
      } while (!card_id);
      employees.push({
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
        manager_id: managers[Math.floor(Math.random() * managers.length)].id,
        job_title_id: jobTitles[Math.floor(Math.random() * jobTitles.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    try {
      await queryInterface.bulkInsert('employees', employees);
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
