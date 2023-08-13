'use strict';
const { CompanyBranch } = require('../models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const companyBranchs = await CompanyBranch.findAll({ attributes: ['id'] });
    const BranchSections = [];
    for (let i = 0; i < 15; i++) {
      BranchSections.push({
        name: Math.random() > 0.5 ? 'sales' : 'maintenance',
        company_branch_id: companyBranchs[Math.floor(Math.random() * companyBranchs.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    try {
      await queryInterface.bulkInsert('branch_sections', BranchSections);
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
