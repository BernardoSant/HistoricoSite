'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Funcionario.init({
    statuFucionario: DataTypes.STRING,
    nameFucionario: DataTypes.STRING,
    generoFucionario: DataTypes.STRING,
    cpfFucionario: DataTypes.STRING,
    rgFucionario: DataTypes.STRING,
    estadoCivilFucionario: DataTypes.STRING,
    conjugueFucionario: DataTypes.STRING,
    cpfConjugueFucionario: DataTypes.STRING,
    paiFucionario: DataTypes.STRING,
    maeFucionario: DataTypes.STRING,
    ruaFucionario: DataTypes.STRING,
    numFucionario: DataTypes.INTEGER,
    municipioFucionario: DataTypes.STRING,
    estadoFucionario: DataTypes.STRING,
    bairroFucionario: DataTypes.STRING,
    complFucionario: DataTypes.STRING,
    ctpsFucionario: DataTypes.STRING,
    titEleitorFucionario: DataTypes.STRING,
    dataAdmicaoFucionario: DataTypes.DATEONLY,
    pisFucionario: DataTypes.STRING,
    salarioFucionario: DataTypes.FLOAT,
    funcaoFuncionario: DataTypes.STRING,
    horasTFucionario: DataTypes.STRING,
    CadastroEmprFuncionario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Funcionario',
  });
  return Funcionario;
};