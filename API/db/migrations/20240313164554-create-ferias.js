'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ferias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idFuncionario: {
        type: Sequelize.INTEGER
      },
      situacaoFerias: {
        type: Sequelize.STRING
      },
      dataInicioFerias: {
        type: Sequelize.DATEONLY
      },
      dataFinalizacaoFerias: {
        type: Sequelize.DATEONLY
      },
      valorFerias: {
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
    await queryInterface.dropTable('Ferias');
  }
};