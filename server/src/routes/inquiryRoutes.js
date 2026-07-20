import express from 'express'
import { auth } from '../middleware/auth.js'
import { validateRequest } from '../utils/validateRequest.js'
import { createInquiry, getBrokerInquiries } from '../controllers/inquiryController.js'
import { inquirySchema } from '../validations/inquiryValidation.js'

const router = express.Router()

router.post('/', auth, validateRequest(inquirySchema), createInquiry)
router.get('/broker', auth, getBrokerInquiries)

export default router
