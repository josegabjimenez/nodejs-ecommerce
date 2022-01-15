const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const { ORDER_TABLE, Order } = require('./orders.model');
const { PRODUCT_TABLE, Product } = require('./products.model');

const ORDERS_PRODUCTS_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const OrderProduct = sequelize.define(
  ORDERS_PRODUCTS_TABLE,
  OrderProductSchema,
  {
    timestamps: false,
  }
);

Order.belongsToMany(Product, {
  as: 'items',
  through: OrderProduct,
});

module.exports = { ORDERS_PRODUCTS_TABLE, OrderProductSchema, OrderProduct };
