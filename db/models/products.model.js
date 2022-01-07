const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
};

const Product = sequelize.define(PRODUCT_TABLE, ProductSchema, {
  timestamps: false,
});

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
