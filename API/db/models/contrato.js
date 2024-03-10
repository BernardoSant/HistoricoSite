'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contrato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contrato.init({
    numeroCT: DataTypes.STRING,
    situacaoCT: DataTypes.STRING,
    ValorCT: DataTypes.FLOAT,
    ValorRecebidoCT: DataTypes.FLOAT,
    nomeCT: DataTypes.STRING,
    empresaCT: DataTypes.INTEGER,
    dataCT: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Contrato',
  });
  return Contrato;
};