const pool = require('../libs/postgres.pool');

class CategoriesService {
  constructor() {
    this.client = pool;
    this.client.on('error', (err) => console.error(err));
  }

  async find() {
    try {
      const query = 'SELECT * FROM tasks';
      const res = await this.client.query(query);
      return res.rows;
    } catch (err) {
      console.error(err);
    }
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
