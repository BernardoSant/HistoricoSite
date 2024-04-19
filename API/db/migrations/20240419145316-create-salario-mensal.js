'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalarioMensals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalFgtsSalario: {
        type: Sequelize.FLOAT
      },
      totalSalarioMes: {
        type: Sequelize.FLOAT
      },
      adiantamentoSalario: {
        type: Sequelize.FLOAT
      },
      salarioFinal: {
        type: Sequelize.FLOAT
      },
      dataSalario: {
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
    await queryInterface.dropTable('SalarioMensals');
  }
};