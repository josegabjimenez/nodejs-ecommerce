class CategoriesService {
  constructor() {}

  async find() {
    return [];
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
