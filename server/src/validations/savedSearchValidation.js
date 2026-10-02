import Joi from 'joi'

const filtersSchema = Joi.object({
  propertyType: Joi.string().valid('office', 'retail', 'warehouse', 'industrial', 'land', 'mixed-use'),
  listingType: Joi.string().valid('sale', 'lease'),
  buildingClass: Joi.string().valid('Class A', 'Class B', 'Class C'),
  city: Joi.string().trim(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  minArea: Joi.number().min(0),
  maxArea: Joi.number().min(0),
  zoning: Joi.string().trim()
}).unknown(false)

export const savedSearchCreateSchema = Joi.object({
  filters: filtersSchema.required(),
  alertFrequency: Joi.string().valid('daily', 'weekly', 'monthly').optional()
}).unknown(false)

export const savedSearchUpdateSchema = Joi.object({
  filters: filtersSchema,
  alertFrequency: Joi.string().valid('daily', 'weekly', 'monthly')
}).min(1).unknown(false)
