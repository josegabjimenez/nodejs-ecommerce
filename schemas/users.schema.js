const Joi = require('joi');

const userId = Joi.number().integer();
const name = Joi.string().min(3).max(60);
const username = Joi.string().min(3).max(60);
const password = Joi.string().min(4).max(60);
const email = Joi.string().email({ tlds: { allow: false } });

const createUserSchema = Joi.object({
  // name: name.required(),
  username: username.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  // name,
  username,
  email,
  password,
});

const getUserSchema = Joi.object({
  userId: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
