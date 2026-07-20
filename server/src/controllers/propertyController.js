import Property from '../models/Property.js'
import { estimatePropertyPrice } from '../services/mlService.js'
import { buildPropertyFilter } from '../utils/filterBuilder.js'

export const listProperties = async (req, res, next) => {
  try {
    const filter = buildPropertyFilter(req.query)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 12
    const sort = req.query.sort || '-createdAt'

    const total = await Property.countDocuments(filter)
    const items = await Property.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('brokerId', 'name email company')

    res.json({ success: true, data: { items, total, page, limit } })
  } catch (error) {
    next(error)
  }
}

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('brokerId', 'name email company')
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' })
    res.json({ success: true, data: property })
  } catch (error) {
    next(error)
  }
}

export const createProperty = async (req, res, next) => {
  try {
    const data = { ...req.body, brokerId: req.user.id }
    const property = await Property.create(data)
    const estimatedPrice = await estimatePropertyPrice(property)
    property.mlEstimatedPrice = estimatedPrice
    await property.save()
    res.status(201).json({ success: true, data: property })
  } catch (error) {
    next(error)
  }
}

export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' })
    if (property.brokerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    Object.assign(property, req.body)
    const estimatedPrice = await estimatePropertyPrice(property)
    property.mlEstimatedPrice = estimatedPrice
    await property.save()
    res.json({ success: true, data: property })
  } catch (error) {
    next(error)
  }
}

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' })
    if (property.brokerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    await property.deleteOne()
    res.json({ success: true, message: 'Property deleted' })
  } catch (error) {
    next(error)
  }
}

export const getSimilarProperties = async (req, res, next) => {
  try {
    const source = await Property.findById(req.params.id)
    if (!source) return res.status(404).json({ success: false, message: 'Property not found' })
    const minPrice = source.price * 0.8
    const maxPrice = source.price * 1.2
    const items = await Property.find({
      _id: { $ne: source._id },
      propertyType: source.propertyType,
      price: { $gte: minPrice, $lte: maxPrice }
    })
      .limit(6)
      .populate('brokerId', 'name email company')

    res.json({ success: true, data: items })
  } catch (error) {
    next(error)
  }
}

export const getNearbyProperties = async (req, res, next) => {
  try {
    const { lat, lng, radiusKm = 10 } = req.query
    if (!lat || !lng) return res.status(400).json({ success: false, message: 'lat and lng required' })
    const distance = Number(radiusKm) * 1000
    const items = await Property.find({
      'location.geo': {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
          $maxDistance: distance
        }
      }
    }).limit(20)

    res.json({ success: true, data: items })
  } catch (error) {
    next(error)
  }
}
