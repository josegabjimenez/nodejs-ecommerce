const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

// const { Product } = require('./products.model');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const Category = sequelize.define(CATEGORY_TABLE, CategorySchema, {
  timestamps: false,
});

// Category.hasMany(Product);

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
