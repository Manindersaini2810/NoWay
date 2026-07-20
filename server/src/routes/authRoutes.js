import express from 'express'
import { validateRequest } from '../utils/validateRequest.js'
import { register, login, refreshToken } from '../controllers/authController.js'
import { registerSchema, loginSchema, refreshSchema } from '../validations/authValidation.js'

const router = express.Router()

router.post('/register', validateRequest(registerSchema), register)
router.post('/login', validateRequest(loginSchema), login)
router.post('/refresh', validateRequest(refreshSchema), refreshToken)

export default router
