'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEmpresa: {
        type: Sequelize.INTEGER
      },
      numeroPedidoNF: {
        type: Sequelize.FLOAT
      },
      numeroNotaNF: {
        type: Sequelize.INTEGER
      },
      nomeEmpresaNF: {
        type: Sequelize.STRING
      },
      cnpjEmpresaNF: {
        type: Sequelize.STRING
      },
      retidoNF: {
        type: Sequelize.STRING
      },
      numeroKinayNF: {
        type: Sequelize.INTEGER
      },
      KinayNF: {
        type: Sequelize.STRING
      },
      porcentagemKinayNF: {
        type: Sequelize.STRING
      },
      descricaoServNF: {
        type: Sequelize.STRING
      },
      ImpostoNF: {
        type: Sequelize.STRING
      },
      totalImpostoNF: {
        type: Sequelize.INTEGER
      },
      valorNF: {
        type: Sequelize.FLOAT
      },
      valorImpostoNF: {
        type: Sequelize.FLOAT
      },
      valorReceberNF: {
        type: Sequelize.FLOAT
      },
      valorRecebidoNF: {
        type: Sequelize.FLOAT
      },
      situacaoNF: {
        type: Sequelize.STRING
      },
      prazoPagamentoNF: {
        type: Sequelize.STRING
      },
      observacaoNF: {
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
    await queryInterface.dropTable('nota');
  }
};