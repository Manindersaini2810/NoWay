import express from 'express'
import { validateRequest } from '../utils/validateRequest.js'
import { auth } from '../middleware/auth.js'
import { authLimiter, otpLimiter } from '../middleware/rateLimiter.js'
import {
  register,
  verifyEmail,
  resendEmailOtp,
  login,
  verify2FA,
  resend2FAOtp,
  googleSignIn,
  refreshToken,
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  getMe,
} from '../controllers/authController.js'
import {
  registerSchema,
  verifyEmailSchema,
  resendEmailOtpSchema,
  loginSchema,
  verify2FASchema,
  resend2FAOtpSchema,
  googleAuthSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js'

const router = express.Router()

// Registration & Email Verification
router.post('/register', authLimiter, validateRequest(registerSchema), register)
router.post('/verify-email', otpLimiter, validateRequest(verifyEmailSchema), verifyEmail)
router.post('/resend-email-otp', otpLimiter, validateRequest(resendEmailOtpSchema), resendEmailOtp)

// Login & Two-Factor Authentication (2FA)
router.post('/login', authLimiter, validateRequest(loginSchema), login)
router.post('/verify-2fa', otpLimiter, validateRequest(verify2FASchema), verify2FA)
router.post('/resend-2fa-otp', otpLimiter, validateRequest(resend2FAOtpSchema), resend2FAOtp)

// Google Identity Services Sign-In
router.post('/google', authLimiter, validateRequest(googleAuthSchema), googleSignIn)

// Token Refresh & Logout
router.post('/refresh', validateRequest(refreshSchema), refreshToken)
router.post('/logout', logout)
router.post('/logout-all', auth, logoutAll)

// Password Recovery
router.post('/forgot-password', authLimiter, validateRequest(forgotPasswordSchema), forgotPassword)
router.post('/reset-password', authLimiter, validateRequest(resetPasswordSchema), resetPassword)

// Current User Profile
router.get('/me', auth, getMe)

export default router
