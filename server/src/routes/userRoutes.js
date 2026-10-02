import express from 'express'
import { auth } from '../middleware/auth.js'
import { validateRequest } from '../utils/validateRequest.js'
import {
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite
} from '../controllers/userController.js'
import { updateProfileSchema } from '../validations/userValidation.js'

const router = express.Router()

router.get('/me', auth, getProfile)
router.put('/me', auth, validateRequest(updateProfileSchema), updateProfile)
router.get('/me/favorites', auth, getFavorites)
router.post('/me/favorites/:propertyId', auth, addFavorite)
router.delete('/me/favorites/:propertyId', auth, removeFavorite)

export default router
