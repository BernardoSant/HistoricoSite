'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Abastecimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Abastecimento.init({
    idTransporte: DataTypes.INTEGER,
    vlrGasolina: DataTypes.FLOAT,
    totalAbastecido: DataTypes.FLOAT,
    diasAbastecido: DataTypes.INTEGER,
    kmRodadoAbastecido: DataTypes.FLOAT,
    dataCadastro: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Abastecimento',
  });
  return Abastecimento;
};