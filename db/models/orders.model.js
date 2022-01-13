const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const { CUSTOMER_TABLE, Customer } = require('./customers.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  paid: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  delivered: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const Order = sequelize.define(ORDER_TABLE, OrderSchema, {
  timestamps: false,
});

Order.belongsTo(Customer);
Customer.hasMany(Order);

module.exports = { ORDER_TABLE, OrderSchema, Order };
