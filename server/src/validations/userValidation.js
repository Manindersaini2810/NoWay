import Joi from 'joi'

export const updateProfileSchema = Joi.object({
  name: Joi.string().trim().optional(),
  phone: Joi.string().optional().allow('', null),
  company: Joi.string().optional().allow('', null)
})
