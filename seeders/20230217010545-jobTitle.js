'use strict';
const { faker } = require('@faker-js/faker');
const { JobTitle } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const jobTitles = [];
    for (let i = 0; i < 10; i++) {
      jobTitles.push({
        name: faker.name.jobTitle(),
        salary: faker.datatype.number({
          'min': 1000,
          'max': 5000
        }),
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    await queryInterface.bulkInsert('job_titles', jobTitles);
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
