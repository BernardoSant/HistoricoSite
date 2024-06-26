'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nota.init({
    idEmpresa: DataTypes.INTEGER,
    numeroPedidoNF: DataTypes.STRING,
    numeroNotaNF: DataTypes.INTEGER,
    nomeEmpresaNF: DataTypes.STRING,
    cnpjEmpresaNF: DataTypes.STRING,
    retidoNF: DataTypes.STRING,
    numeroKinayNF: DataTypes.INTEGER,
    KinayNF: DataTypes.STRING,
    porcentagemKinayNF: DataTypes.STRING,
    descricaoServNF: DataTypes.STRING,
    ImpostoNF: DataTypes.STRING,
    totalImpostoNF: DataTypes.INTEGER,
    valorNF: DataTypes.FLOAT,
    valorImpostoNF: DataTypes.FLOAT,
    valorReceberNF: DataTypes.FLOAT,
    valorRecebidoNF: DataTypes.FLOAT,
    situacaoNF: DataTypes.STRING,
    prazoPagamentoNF: DataTypes.STRING,
    dataNF: DataTypes.DATEONLY,
    observacaoNF: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nota',
  });
  return nota;
};