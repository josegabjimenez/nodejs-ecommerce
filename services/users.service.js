const boom = require('@hapi/boom');
// const connection = require('../libs/postgres');
const sequelize = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async find() {
    // const client = await connection();
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }

  findOne() {
    return {};
  }

  create(data) {
    return { id: 1, ...data };
  }

  async update(id, data) {
    if (id == 1) {
      throw boom.conflict('The id 1 is not available in the database.');
    }
    return { id, ...data };
  }

  delete(id) {
    return { id };
  }
}

module.exports = UsersService;
