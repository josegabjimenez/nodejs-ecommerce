const Joi = require('joi');

const orderId = Joi.number().integer().min(0);
const customerId = Joi.number().integer().min(0);
const paid = Joi.boolean();
const delivered = Joi.boolean();
const productId = Joi.number().integer().min(0);
const amount = Joi.number().integer().min(1);

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

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema,
};
