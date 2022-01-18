const boom = require('@hapi/boom');
const { User } = require('../db/models');

class UsersService {
  constructor() {}

  async find() {
    const users = await User.findAll({
      include: ['customer'],
    });
    return users;
  }

  async findOne(id) {
    const user = await User.findByPk(id, {
      include: ['customer'],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async create(data) {
    const newUser = await User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    await user.update(data);
    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return user;
  }
}

module.exports = UsersService;
