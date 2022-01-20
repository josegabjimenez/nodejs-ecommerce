const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(4).max(60);
const token = Joi.string();

const recoverPasswordSchema = Joi.object({
  email: email.required(),
});

const changePasswordSchema = Joi.object({
  token: token.required(),
  password: password.required(),
});

module.exports = {
  recoverPasswordSchema,
  changePasswordSchema,
};
