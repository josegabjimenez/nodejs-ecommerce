const express = require('express');
const router = express.Router();
const response = require('./response');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      const finalPayload = {
        user,
        token,
      };
      response.success(
        req,
        res,
        'User was logged in successfully',
        200,
        finalPayload
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
