const Joi = require('joi');
// const joi = require('joi');

const schema = {
  registerSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8).required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8).required(),
  }),
  postSchema: Joi.object({
    body: Joi.string().max(100).required(),
    sub: Joi.string().max(200).required(),
  }),
  putSchema: Joi.object({
    body: Joi.string().max(100).required(),
    sub: Joi.string().max(200).required(),
  }),
};

module.exports = schema;
