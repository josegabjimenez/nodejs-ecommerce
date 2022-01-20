const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
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
  recoveryToken: {
    field: 'recovery_token',
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
};

const User = sequelize.define(USER_TABLE, UserSchema, {
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    },
  },
});

module.exports = { USER_TABLE, UserSchema, User };
