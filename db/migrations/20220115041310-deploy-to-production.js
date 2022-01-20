'use strict';

const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/users.model');
const { CATEGORY_TABLE } = require('../models/categories.model');
const { PRODUCT_TABLE } = require('../models/products.model');
const { CUSTOMER_TABLE } = require('../models/customers.model');
const { ORDER_TABLE } = require('../models/orders.model');
const { ORDERS_PRODUCTS_TABLE } = require('../models/orders-products.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer',
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
    await queryInterface.createTable(CATEGORY_TABLE, {
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
    });
    await queryInterface.createTable(PRODUCT_TABLE, {
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
    });
    await queryInterface.createTable(CUSTOMER_TABLE, {
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
    });
    await queryInterface.createTable(ORDER_TABLE, {
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
    });
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, {
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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  },
};
