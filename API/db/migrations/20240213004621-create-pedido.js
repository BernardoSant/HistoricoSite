'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroPDD: {
        type: Sequelize.STRING
      },
      valorPDD: {
        type: Sequelize.FLOAT
      },
      nomePDD: {
        type: Sequelize.STRING
      },
      descricaoServPDD: {
        type: Sequelize.STRING
      },
      empresaPDD: {
        type: Sequelize.STRING
      },
      situacaoPDD: {
        type: Sequelize.STRING
      },
      dataPDD: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos');
  }
};