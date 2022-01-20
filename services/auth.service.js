const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config');

const UsersService = require('./users.service');
const service = new UsersService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user)
      throw boom.unauthorized("That email doesn't exist in our system.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized('Wrong password');
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    delete user.dataValues.recoveryToken;
    return { user, token };
  }

  async sendRecoverEmail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized("That email doesn't exist in our system.");
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecretRecovery, {
      expiresIn: '15min',
    });
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: `"Jose Gabo 👻" <${config.smtpEmail}>`, // sender address
      to: user.email, // list of receivers
      subject: 'Recover password ✔', // Subject line
      text: '', // plain text body
      html: `<h1><b>To recover your password, please follow this link -> http:/front.com/recovery/?token=${token}</b></h1>`, // html body
    };
    const res = await this.sendEmail(mail);
    return res;
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Invalid token');
      }
      const hash = await bcrypt.hash(password, 10);
      await service.update(user.id, {
        recoveryToken: 'null',
        password: hash,
      });
      return null;
    } catch (err) {
      throw boom.unauthorized();
    }
  }

  async sendEmail(infoEmail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });
    //? Send the email
    const info = await transporter.sendMail(infoEmail);
    return { id: info.messageId };
  }
}

module.exports = AuthService;
