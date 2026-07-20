import Joi from 'joi'

export const inquirySchema = Joi.object({
  propertyId: Joi.string().required(),
  message: Joi.string().trim().required()
})
