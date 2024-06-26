'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pedido.init({
    numeroPDD: DataTypes.STRING,
    valorPDD: DataTypes.FLOAT,
    valorRecebidoPDD: DataTypes.FLOAT,
    nomePDD: DataTypes.STRING,
    descricaoServPDD: DataTypes.STRING,
    empresaPDD: DataTypes.INTEGER,
    situacaoPDD: DataTypes.STRING,
    dataPDD: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'pedido',
  });
  return pedido;
};