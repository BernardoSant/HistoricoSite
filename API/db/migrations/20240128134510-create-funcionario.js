'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Funcionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameFucionario: {
        type: Sequelize.STRING
      },
      generoFucionario: {
        type: Sequelize.STRING
      },
      cpfFucionario: {
        type: Sequelize.STRING
      },
      rgFucionario: {
        type: Sequelize.STRING
      },
      estadoCivilFucionario: {
        type: Sequelize.STRING
      },
      conjugueFucionario: {
        type: Sequelize.STRING
      },
      cpfConjugueFucionario: {
        type: Sequelize.STRING
      },
      paiFucionario: {
        type: Sequelize.STRING
      },
      maeFucionario: {
        type: Sequelize.STRING
      },
      ruaFucionario: {
        type: Sequelize.STRING
      },
      numFucionario: {
        type: Sequelize.INTEGER
      },
      municipioFucionario: {
        type: Sequelize.STRING
      },
      estadoFucionario: {
        type: Sequelize.STRING
      },
      bairroFucionario: {
        type: Sequelize.STRING
      },
      complFucionario: {
        type: Sequelize.STRING
      },
      ctpsFucionario: {
        type: Sequelize.STRING
      },
      titEleitorFucionario: {
        type: Sequelize.STRING
      },
      dataAdmicaoFucionario: {
        type: Sequelize.DATEONLY
      },
      pisFucionario: {
        type: Sequelize.STRING
      },
      salarioFucionario: {
        type: Sequelize.FLOAT
      },
      funcaoFuncionario: {
        type: Sequelize.STRING
      },
      horasTFucionario: {
        type: Sequelize.STRING
      },
      CadastroEmprFuncionario: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Funcionarios');
  }
};