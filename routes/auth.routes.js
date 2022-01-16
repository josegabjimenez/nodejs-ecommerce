const express = require('express');
const router = express.Router();
const response = require('./response');
const passport = require('passport');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      response.success(
        req,
        res,
        'User was logged in successfully',
        200,
        req.user
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
