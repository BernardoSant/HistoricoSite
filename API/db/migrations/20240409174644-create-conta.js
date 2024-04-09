'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conta', {
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
      Conta: {
        type: Sequelize.STRING
      },
      frequenciaConta: {
        type: Sequelize.BOOLEAN
      },
      parcelasConta: {
        type: Sequelize.INTEGER
      },
      parcelasPagasConta: {
        type: Sequelize.INTEGER
      },
      dataInConta: {
        type: Sequelize.DATEONLY
      },
      dataFnConta: {
        type: Sequelize.DATEONLY
      },
      valorParcelaConta: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Conta');
  }
};