'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treinamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Treinamento.init({
    idFuncionario: DataTypes.INTEGER,
    idCertificado: DataTypes.INTEGER,
    dataTreinamento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Treinamento',
  });
  return Treinamento;
};