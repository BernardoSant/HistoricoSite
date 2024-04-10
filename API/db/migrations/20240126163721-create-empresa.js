'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameEmpresa: {
        type: Sequelize.STRING
      },
      siglaEmpresa: {
        type: Sequelize.STRING
      },
      emailEmpresa: {
        type: Sequelize.STRING
      },
      cepEmpresa: {
        type: Sequelize.STRING
      },
      ruaEmpresa: {
        type: Sequelize.STRING
      },
      bairroEmpresa: {
        type: Sequelize.STRING
      },
      numeroEmpresa: {
        type: Sequelize.INTEGER
      },
      complEmpresa: {
        type: Sequelize.STRING
      },
      cidadeEmpresa: {
        type: Sequelize.STRING
      },
      cnpjEmpresa: {
        type: Sequelize.STRING
      },
      responsavelEmpresa: {
        type: Sequelize.STRING
      },
      situacaoEmpresa: {
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
    await queryInterface.dropTable('Empresas');
  }
};