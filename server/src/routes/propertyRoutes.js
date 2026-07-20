import express from 'express'
import { auth } from '../middleware/auth.js'
import { roleGuard } from '../middleware/roleGuard.js'
import { validateRequest } from '../utils/validateRequest.js'
import {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getSimilarProperties,
  getNearbyProperties
} from '../controllers/propertyController.js'
import { propertyCreateSchema, propertyUpdateSchema } from '../validations/propertyValidation.js'

const router = express.Router()

router.get('/', listProperties)
router.get('/nearby', getNearbyProperties)
router.get('/:id/similar', getSimilarProperties)
router.get('/:id', getPropertyById)
router.post('/', auth, roleGuard(['broker', 'admin']), validateRequest(propertyCreateSchema), createProperty)
router.put('/:id', auth, validateRequest(propertyUpdateSchema), updateProperty)
router.delete('/:id', auth, deleteProperty)

export default router
