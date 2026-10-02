import Property from '../models/Property.js'
import { estimatePropertyPrice } from '../services/mlService.js'
import { buildPropertyFilter } from '../services/searchService.js'
import { findNearbyProperties } from '../services/geoService.js'
import { getPagination, getPaginationResponse } from '../utils/pagination.js'

export const listProperties = async (req, res, next) => {
  try {
    const filter = buildPropertyFilter(req.query)
    const { page, limit, skip, sort } = getPagination(req.query)
    const [items, total] = await Promise.all([
      Property.find(filter).sort(sort).skip(skip).limit(limit).populate('brokerId', 'name email company'),
      Property.countDocuments(filter)
    ])
    res.json({ success: true, data: getPaginationResponse(items, total, page, limit) })
  } catch (error) {
    next(error)
  }
}

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('brokerId', 'name email company')
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' })
    await Property.updateOne({ _id: property._id }, { $inc: { views: 1 } })
    res.json({ success: true, data: property })
  } catch (error) {
    next(error)
  }
}

export const createProperty = async (req, res, next) => {
  try {
    const data = { ...req.body, brokerId: req.user.id }
    if (req.uploadedImageUrls?.length) {
      data.media = { ...data.media, images: [...(data.media?.images || []), ...req.uploadedImageUrls] }
    }
    const property = new Property(data)
    property.mlEstimatedPrice = await estimatePropertyPrice(property)
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
    if (property.brokerId?.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    if (req.uploadedImageUrls?.length) {
      const existingMedia = property.media?.toObject?.() || property.media || {}
      req.body.media = {
        ...existingMedia,
        ...req.body.media,
        images: [...(req.body.media?.images || property.media?.images || []), ...req.uploadedImageUrls]
      }
    }
    Object.assign(property, req.body)
    property.mlEstimatedPrice = await estimatePropertyPrice(property)
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
    if (property.brokerId?.toString() !== req.user.id && req.user.role !== 'admin') {
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
    const items = await Property.find({
      _id: { $ne: source._id },
      status: 'active',
      propertyType: source.propertyType,
      price: { $gte: source.price * 0.8, $lte: source.price * 1.2 }
    }).limit(6).populate('brokerId', 'name email company')
    res.json({ success: true, data: items })
  } catch (error) {
    next(error)
  }
}

export const getNearbyProperties = async (req, res, next) => {
  try {
    const { lat, lng, radiusKm } = req.query
    const latitude = Number(lat)
    const longitude = Number(lng)
    const radius = Number(radiusKm || 10)
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !Number.isFinite(radius) || radius <= 0) {
      return res.status(400).json({ success: false, message: 'Valid lat, lng, and positive radiusKm are required' })
    }
    const items = await findNearbyProperties({ latitude, longitude, radiusMeters: radius * 1000 })
    res.json({ success: true, data: items })
  } catch (error) {
    next(error)
  }
}
