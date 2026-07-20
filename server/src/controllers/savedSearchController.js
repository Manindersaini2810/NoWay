import SavedSearch from '../models/SavedSearch.js'

export const createSavedSearch = async (req, res, next) => {
  try {
    const savedSearch = await SavedSearch.create({ ...req.body, userId: req.user.id })
    res.status(201).json({ success: true, data: savedSearch })
  } catch (error) {
    next(error)
  }
}

export const listSavedSearches = async (req, res, next) => {
  try {
    const items = await SavedSearch.find({ userId: req.user.id })
    res.json({ success: true, data: items })
  } catch (error) {
    next(error)
  }
}

export const getSavedSearch = async (req, res, next) => {
  try {
    const item = await SavedSearch.findOne({ _id: req.params.id, userId: req.user.id })
    if (!item) return res.status(404).json({ success: false, message: 'Saved search not found' })
    res.json({ success: true, data: item })
  } catch (error) {
    next(error)
  }
}

export const updateSavedSearch = async (req, res, next) => {
  try {
    const item = await SavedSearch.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true })
    if (!item) return res.status(404).json({ success: false, message: 'Saved search not found' })
    res.json({ success: true, data: item })
  } catch (error) {
    next(error)
  }
}

export const deleteSavedSearch = async (req, res, next) => {
  try {
    const item = await SavedSearch.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!item) return res.status(404).json({ success: false, message: 'Saved search not found' })
    res.json({ success: true, data: item })
  } catch (error) {
    next(error)
  }
}
