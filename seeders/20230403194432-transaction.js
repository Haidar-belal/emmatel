'use strict';
const { BranchSection, Employee } = require('../models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const branchSections = await BranchSection.findAll({ attributes: ['id'] });
    const employees = await Employee.findAll({ attributes: ['id'] });
    const transactions = [];
    for (let i = 0; i < 80; i++) {
      transactions.push({
        archived: false,
        branch_section_id: branchSections[Math.floor(Math.random() * branchSections.length)].id,
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    try {
      await queryInterface.bulkInsert('transactions', transactions);
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
