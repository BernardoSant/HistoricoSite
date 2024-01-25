'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Empresa.init({
    nameEmpresa: DataTypes.STRING,
    emailEmpresa: DataTypes.STRING,
    cepEmpresa: DataTypes.STRING,
    ruaEmpresa: DataTypes.STRING,
    bairroEmpresa: DataTypes.STRING,
    numeroEmpresa: DataTypes.INTEGER,
    complEmpresa: DataTypes.STRING,
    cidadeEmpresa: DataTypes.STRING,
    cnpjEmpresa: DataTypes.STRING,
    responsavelEmpresa: DataTypes.STRING,
    cadastroEmpresa: DataTypes.DATEONLY,
    situacaoEmpresa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};