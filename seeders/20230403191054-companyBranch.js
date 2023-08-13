'use strict';
const { Manager } = require('../models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const managers = await Manager.findAll({ attributes: ['id'] });
    const companyBranchs = [];
    for (let i = 0; i < 10; i++) {
      companyBranchs.push({
        number: faker.random.numeric(),
        name: faker.company.name(),
        city: faker.address.city(),
        region: faker.address.state(),
        street: faker.address.street(),
        near_by: faker.address.secondaryAddress(),
        manager_id: managers[Math.floor(Math.random() * managers.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    try {
      await queryInterface.bulkInsert('company_branches', companyBranchs);
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
