import Joi from 'joi'

export const predictionSchema = Joi.object({
  area: Joi.number().positive().required(),
  propertyType: Joi.string().valid('office', 'retail', 'warehouse', 'industrial', 'land', 'mixed-use').required(),
  buildingClass: Joi.string().valid('Class A', 'Class B', 'Class C').optional(),
  yearBuilt: Joi.number().integer().min(1800).max(2100).optional(),
  floors: Joi.number().positive().optional(),
  parkingSpaces: Joi.number().min(0).optional(),
  city: Joi.string().optional(),
  lat: Joi.number().min(-90).max(90).optional(),
  lng: Joi.number().min(-180).max(180).optional(),
  ceilingHeightFt: Joi.number().positive().optional(),
  occupancyStatus: Joi.string().valid('Vacant', 'Occupied').optional()
})
