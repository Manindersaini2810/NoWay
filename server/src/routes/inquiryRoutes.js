import express from 'express'
import { auth } from '../middleware/auth.js'
import { roleGuard } from '../middleware/roleGuard.js'
import { validateRequest } from '../utils/validateRequest.js'
import { createInquiry, getBrokerInquiries } from '../controllers/inquiryController.js'
import { inquirySchema } from '../validations/inquiryValidation.js'

const router = express.Router()

router.post('/', auth, validateRequest(inquirySchema), createInquiry)
router.get('/broker', auth, roleGuard(['broker', 'admin']), getBrokerInquiries)

export default router
