'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cargo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cargo.init({
    nomeCargo: DataTypes.STRING,
    salarioCargo: DataTypes.FLOAT,
    quantidadeCargo: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cargo',
  });
  return Cargo;
};