const pool = require('../libs/postgres.pool');

class CategoriesService {
  constructor() {
    this.client = pool;
    this.client.on('error', (err) => console.error(err));
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const res = await this.client.query(query);
    return res.rows;
  }

  async findOne(id) {
    return { id };
  }

  async create(data) {
    return { id: 1, ...data };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = CategoriesService;
