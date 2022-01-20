const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');
// const bcrypt = require('bcrypt');

const { USER_TABLE, User } = require('./users.model'); //* Relation 1-1

// Table name
const CUSTOMER_TABLE = 'customers';

// Schema
const CustomerSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

// Model
const Customer = sequelize.define(CUSTOMER_TABLE, CustomerSchema, {
  timestamps: false,
  // hooks: {
  //   beforeCreate: async (customer) => {
  //     const hash = await bcrypt.hash(customer.user.password, 10);
  //     customer.user.password = hash;
  //   },
  // },
});

// Relation 1-1 with User model
Customer.belongsTo(User);
User.hasOne(Customer);

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
