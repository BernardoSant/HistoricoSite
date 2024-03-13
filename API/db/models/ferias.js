'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ferias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ferias.init({
    idFuncionario: DataTypes.INTEGER,
    situacaoFerias: DataTypes.STRING,
    dataInicioFerias: DataTypes.DATEONLY,
    dataFinalizacaoFerias: DataTypes.DATEONLY,
    valorFerias: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Ferias',
  });
  return Ferias;
};