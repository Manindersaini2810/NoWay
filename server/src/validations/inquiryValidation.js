import Joi from 'joi'

export const inquirySchema = Joi.object({
  propertyId: Joi.string().hex().length(24).required(),
  message: Joi.string().trim().min(5).max(5000).required()
})
