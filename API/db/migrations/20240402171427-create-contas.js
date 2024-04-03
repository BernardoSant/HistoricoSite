'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricaoConta: {
        type: Sequelize.STRING
      },
      tipoConta: {
        type: Sequelize.STRING
      },
      estadoConta: {
        type: Sequelize.STRING
      },
      frequenciaConta: {
        type: Sequelize.BOOLEAN
      },
      parcelasConta: {
        type: Sequelize.INTEGER
      },
      dataInicioConta: {
        type: Sequelize.DATEONLY
      },
      valorConta: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Contas');
  }
};