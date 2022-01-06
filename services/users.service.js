const boom = require('@hapi/boom');
const { User } = require('../db/models');

class UsersService {
  constructor() {}

  async find() {
    const users = await User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data) {
    const newUser = await User.create(data);
    return newUser;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    await user.update(data);
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return user;
  }
}

module.exports = UsersService;
