'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contratos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroCT: {
        type: Sequelize.FLOAT
      },
      ValorCT: {
        type: Sequelize.FLOAT
      },
      ValorReceberCT: {
        type: Sequelize.FLOAT
      },
      nomeCT: {
        type: Sequelize.STRING
      },
      empresaCT: {
        type: Sequelize.INTEGER
      },
      dataCT: {
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
    await queryInterface.dropTable('Contratos');
  }
};