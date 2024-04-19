'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalarioMensal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalarioMensal.init({
    totalFgtsSalario: DataTypes.FLOAT,
    totalSalarioMes: DataTypes.FLOAT,
    adiantamentoSalario: DataTypes.FLOAT,
    salarioFinal: DataTypes.FLOAT,
    dataSalario: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'SalarioMensal',
  });
  return SalarioMensal;
};