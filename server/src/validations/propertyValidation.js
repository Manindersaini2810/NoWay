import Joi from 'joi'

export const propertyCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  listingType: Joi.string().valid('sale', 'lease').required(),
  propertyType: Joi.string().valid('office', 'retail', 'warehouse', 'industrial', 'land', 'mixed-use').required(),
  price: Joi.number().positive().required(),
  pricePerSqFt: Joi.number().positive().optional(),
  capRate: Joi.number().optional(),
  area: Joi.object({
    totalSqFt: Joi.number().positive().required(),
    lotSqFt: Joi.number().positive().optional()
  }).required(),
  structural: Joi.object({
    yearBuilt: Joi.number().optional(),
    buildingClass: Joi.string().valid('Class A', 'Class B', 'Class C').optional(),
    floors: Joi.number().optional(),
    ceilingHeightFt: Joi.number().optional(),
    parkingSpaces: Joi.number().optional(),
    loadingDocks: Joi.number().optional(),
    hvacType: Joi.string().optional(),
    zoning: Joi.string().optional(),
    occupancyStatus: Joi.string().valid('Vacant', 'Occupied').optional()
  }).optional(),
  location: Joi.object({
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zip: Joi.string().optional(),
    geo: Joi.object({
      type: Joi.string().valid('Point').optional(),
      coordinates: Joi.array().items(Joi.number()).length(2).optional()
    }).optional()
  }).optional(),
  media: Joi.object({
    images: Joi.array().items(Joi.string().uri()).optional(),
    floorPlans: Joi.array().items(Joi.string().uri()).optional(),
    documents: Joi.array().items(Joi.string().uri()).optional()
  }).optional(),
  amenities: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid('active', 'pending', 'sold', 'leased').optional()
})

export const propertyUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  listingType: Joi.string().valid('sale', 'lease').optional(),
  propertyType: Joi.string().valid('office', 'retail', 'warehouse', 'industrial', 'land', 'mixed-use').optional(),
  price: Joi.number().positive().optional(),
  pricePerSqFt: Joi.number().positive().optional(),
  capRate: Joi.number().optional(),
  area: Joi.object({
    totalSqFt: Joi.number().positive().optional(),
    lotSqFt: Joi.number().positive().optional()
  }).optional(),
  structural: Joi.object({
    yearBuilt: Joi.number().optional(),
    buildingClass: Joi.string().valid('Class A', 'Class B', 'Class C').optional(),
    floors: Joi.number().optional(),
    ceilingHeightFt: Joi.number().optional(),
    parkingSpaces: Joi.number().optional(),
    loadingDocks: Joi.number().optional(),
    hvacType: Joi.string().optional(),
    zoning: Joi.string().optional(),
    occupancyStatus: Joi.string().valid('Vacant', 'Occupied').optional()
  }).optional(),
  location: Joi.object({
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zip: Joi.string().optional(),
    geo: Joi.object({
      type: Joi.string().valid('Point').optional(),
      coordinates: Joi.array().items(Joi.number()).length(2).optional()
    }).optional()
  }).optional(),
  media: Joi.object({
    images: Joi.array().items(Joi.string().uri()).optional(),
    floorPlans: Joi.array().items(Joi.string().uri()).optional(),
    documents: Joi.array().items(Joi.string().uri()).optional()
  }).optional(),
  amenities: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid('active', 'pending', 'sold', 'leased').optional()
})
