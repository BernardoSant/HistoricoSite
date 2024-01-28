'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kinay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kinay.init({
    numeroKinay: DataTypes.INTEGER,
    descricaoKinay: DataTypes.STRING,
    porcentagemKinay: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Kinay',
  });
  return Kinay;
};