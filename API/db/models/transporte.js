'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transporte.init({
    nomeTransporte: DataTypes.STRING,
    placaTransporte: DataTypes.STRING,
    renavamTransporte: DataTypes.STRING,
    anoTransporte: DataTypes.INTEGER,
    modeloTransporte: DataTypes.STRING,
    capacidadeTransporte: DataTypes.INTEGER,
    kmRodadoTransporte: DataTypes.FLOAT,
    kmPorLitroTransporte: DataTypes.FLOAT,
    kmPorDiaTransporte: DataTypes.FLOAT,
    tanqueTransporte: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transporte',
  });
  return Transporte;
};