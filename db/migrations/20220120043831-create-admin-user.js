'use strict';

require('dotenv').config();

const { USER_TABLE } = require('../models/users.model');

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: hash,
        role: 'admin',
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(USER_TABLE, {
      email: process.env.ADMIN_EMAIL,
    });
  },
};
