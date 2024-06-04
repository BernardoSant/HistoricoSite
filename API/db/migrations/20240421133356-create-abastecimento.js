'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Abastecimentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTransporte: {
        type: Sequelize.INTEGER
      },
      vlrGasolina: {
        type: Sequelize.FLOAT
      },
      totalAbastecido: {
        type: Sequelize.FLOAT
      },
      totalValor: {
        type: Sequelize.FLOAT
      },
      kmRodadoAbastecido: {
        type: Sequelize.FLOAT
      },
      kmDiferença: {
        type: Sequelize.FLOAT
      },
      dataCadastro: {
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
    await queryInterface.dropTable('Abastecimentos');
  }
};