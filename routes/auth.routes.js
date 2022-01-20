const express = require('express');
const router = express.Router();
const response = require('./response');
const passport = require('passport');

// Middleware
const validator = require('../middlewares/validator.handler');
const {
  recoverPasswordSchema,
  changePasswordSchema,
} = require('../schemas/auth.schema');

const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const data = service.signToken(user);
      response.success(req, res, 'User was logged in successfully', 200, data);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/recovery',
  validator(recoverPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const data = await service.sendRecoverEmail(email);
      response.success(req, res, 'Email sent successfully', 200, data);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/change-password',
  validator(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      await service.changePassword(token, password);
      response.success(req, res, 'User password was changed successfully', 200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
