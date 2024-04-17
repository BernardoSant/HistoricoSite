'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transportes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeTransporte: {
        type: Sequelize.STRING
      },
      placaTransporte: {
        type: Sequelize.STRING
      },
      renavamTransporte: {
        type: Sequelize.STRING
      },
      anoTransporte: {
        type: Sequelize.INTEGER
      },
      modeloTransporte: {
        type: Sequelize.STRING
      },
      capacidadeTransporte: {
        type: Sequelize.INTEGER
      },
      kmRodadoTransporte: {
        type: Sequelize.FLOAT
      },
      kmPorLitroTransporte: {
        type: Sequelize.FLOAT
      },
      kmPorDiaTransporte: {
        type: Sequelize.FLOAT
      },
      tanqueTransporte: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Transportes');
  }
};