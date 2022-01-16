const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UsersService = require('../../../services/users.service');
const service = new UsersService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user)
        done(
          boom.unauthorized("That email doesn't exist in our system."),
          false
        );
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) done(boom.unauthorized('Wrong password'), false);
      delete user.dataValues.password;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = {
  LocalStrategy,
};
