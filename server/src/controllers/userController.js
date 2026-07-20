import User from '../models/User.js'

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
    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites')
    res.json({ success: true, data: user.favorites || [] })
  } catch (error) {
    next(error)
  }
}

export const addFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const propertyId = req.params.propertyId
    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId)
      await user.save()
    }
    res.json({ success: true, data: user.favorites })
  } catch (error) {
    next(error)
  }
}
