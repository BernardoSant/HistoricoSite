'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conta.init({
    descricaoConta: DataTypes.STRING,
    tipoConta: DataTypes.STRING,
    Conta: DataTypes.STRING,
    frequenciaConta: DataTypes.BOOLEAN,
    parcelasConta: DataTypes.INTEGER,
    parcelasPagasConta: DataTypes.INTEGER,
    dataInConta: DataTypes.DATEONLY,
    dataFnConta: DataTypes.DATEONLY,
    valorParcelaConta: DataTypes.FLOAT,
    valorConta: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Conta',
  });
  return Conta;
};