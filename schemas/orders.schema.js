const Joi = require('joi');

const orderId = Joi.number().integer().min(0);
const customerId = Joi.number().integer().min(0);
const paid = Joi.boolean();
const delivered = Joi.boolean();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  paid,
  delivered,
});

const updateOrderSchema = Joi.object({
  paid,
  delivered,
});

const getOrderSchema = Joi.object({
  orderId: orderId.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
};
