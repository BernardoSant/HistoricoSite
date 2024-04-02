'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contas.init({
    descricaoConta: DataTypes.STRING,
    tipoConta: DataTypes.STRING,
    estadoConta: DataTypes.STRING,
    parcelasConta: DataTypes.INTEGER,
    dataInicioConta: DataTypes.DATEONLY,
    valorConta: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Contas',
  });
  return Contas;
};