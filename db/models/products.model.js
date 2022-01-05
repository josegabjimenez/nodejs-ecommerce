const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const Product = sequelize.define(
  'product',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);

Product.sync();

module.exports = Product;
