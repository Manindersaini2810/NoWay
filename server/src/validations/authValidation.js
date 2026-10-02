import Joi from 'joi'

export const registerSchema = Joi.object({
  name: Joi.string().trim(),
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('buyer', 'broker').optional(),
  phone: Joi.string().optional().allow('', null),
  company: Joi.string().optional().allow('', null)
}).or('name', 'firstName')

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required()
})

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required()
})
