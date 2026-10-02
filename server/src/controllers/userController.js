import User from '../models/User.js'
import Property from '../models/Property.js'

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash')
    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body }
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-passwordHash')
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites')
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: user.favorites || [] })
  } catch (error) {
    next(error)
  }
}

export const addFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const propertyId = req.params.propertyId
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    const propertyExists = await Property.exists({ _id: propertyId })
    if (!propertyExists) return res.status(404).json({ success: false, message: 'Property not found' })
    if (!user.favorites.some((favoriteId) => favoriteId.toString() === propertyId)) {
      user.favorites.push(propertyId)
      await user.save()
    }
    res.json({ success: true, data: user.favorites })
  } catch (error) {
    next(error)
  }
}

export const removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: req.params.propertyId } },
      { new: true }
    ).select('favorites')
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: user.favorites })
  } catch (error) {
    next(error)
  }
}
