'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('buyers', 'reset_password_token');
    await queryInterface.removeColumn('buyers', 'reset_password_expires');
  },

  async down(queryInterface, Sequelize) {
    // Add token and expiry columns back
    await queryInterface.addColumn('buyers', 'reset_password_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('buyers', 'reset_password_expires', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
