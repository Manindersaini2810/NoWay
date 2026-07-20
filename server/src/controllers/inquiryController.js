import Inquiry from '../models/Inquiry.js'
import Property from '../models/Property.js'

export const createInquiry = async (req, res, next) => {
  try {
    const { propertyId, message } = req.body
    const property = await Property.findById(propertyId)
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' })

    const inquiry = await Inquiry.create({
      propertyId,
      buyerId: req.user.id,
      brokerId: property.brokerId,
      message
    })

    res.status(201).json({ success: true, data: inquiry })
  } catch (error) {
    next(error)
  }
}

export const getBrokerInquiries = async (req, res, next) => {
  try {
    const items = await Inquiry.find({ brokerId: req.user.id }).populate('propertyId', 'title location')
    res.json({ success: true, data: items })
  } catch (error) {
    next(error)
  }
}
