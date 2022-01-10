const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const { CATEGORY_TABLE, Category } = require('./categories.model');

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
    allowNull: false,
    type: DataTypes.TEXT,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

const Product = sequelize.define(PRODUCT_TABLE, ProductSchema, {
  timestamps: false,
});

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
