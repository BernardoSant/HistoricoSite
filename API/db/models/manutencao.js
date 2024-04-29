'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manutencao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Manutencao.init({
    idTransport: DataTypes.INTEGER,
    descricaoManutencao: DataTypes.STRING,
    dataManutencao: DataTypes.DATEONLY,
    valorManutencao: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Manutencao',
  });
  return Manutencao;
};