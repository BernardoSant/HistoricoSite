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
      statuFucionario: {
        type: Sequelize.STRING
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
      dataNascimento: {
        type: Sequelize.DATEONLY
      },
      dataAdmicaoFucionario: {
        type: Sequelize.DATEONLY
      },
      dataExames: {
        type: Sequelize.DATEONLY
      },
      dataFeriasFucionario: {
        type: Sequelize.DATEONLY
      },
      feriasPaga:{
        type: Sequelize.INTEGER
      },
      pisFucionario: {
        type: Sequelize.STRING
      },
      salarioFucionario: {
        type: Sequelize.FLOAT
      },
      diasFaltas: {
        type: Sequelize.INTEGER
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