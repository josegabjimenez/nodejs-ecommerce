const boom = require('@hapi/boom');
const { User } = require('../db/models');

class UsersService {
  constructor() {}

  async find() {
    const users = await User.findAll();
    return users;
  }

  async findOne(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw boom.notFound('User not found');
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async create(data) {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async update(id, data) {
    try {
      const user = await this.findOne(id);
      await user.update(data);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      const user = await this.findOne(id);
      await user.destroy();
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UsersService;
