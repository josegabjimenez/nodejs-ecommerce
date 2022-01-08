const Joi = require('joi');

const customerId = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(6).max(10);
const userId = Joi.number().integer();
const { createUserSchema, updateUserSchema } = require('./users.schema');

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema,
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  user: updateUserSchema,
  userId,
});

const getCustomerSchema = Joi.object({
  customerId: customerId.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
