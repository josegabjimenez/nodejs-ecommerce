const boom = require('@hapi/boom');
const connection = require('../libs/postgres');

class UsersService {
  constructor() {}

  async find() {
    const client = await connection();
    const res = await client.query('SELECT * FROM tasks');
    return res.rows;
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
