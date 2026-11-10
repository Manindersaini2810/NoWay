import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import User from '../models/User.js'
import OTP from '../models/OTP.js'
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../utils/generateTokens.js'
import { generateNumericOTP, hashOTP, verifyOTPHash } from '../utils/generateOTP.js'
import emailService from '../services/emailService.js'
import googleAuthService from '../services/googleAuthService.js'

const OTP_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes
const RESEND_COOLDOWN_MS = 60 * 1000 // 60 seconds
const MAX_OTP_ATTEMPTS = 5

/**
 * Helper to get client IP and User Agent
 */
const getClientInfo = (req) => ({
  ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown',
  userAgent: req.headers['user-agent'] || 'Unknown',
})

/**
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, firstName, lastName, email, password, role, phone, company } = req.body
    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
      })
    }

    // Hash password with 12 rounds of bcrypt
    const passwordHash = await bcrypt.hash(password, 12)
    const fullName = name ? name.trim() : [firstName, lastName].filter(Boolean).join(' ') || 'Commercial Member'

    // Create user with unverified email
    const user = await User.create({
      name: fullName,
      email: normalizedEmail,
      passwordHash,
      role: role || 'buyer',
      phone: phone || '',
      company: company || '',
      isEmailVerified: false,
      isTwoFactorEnabled: true,
    })

    // Generate 6-digit OTP
    const rawOtp = generateNumericOTP()
    const otpHash = await hashOTP(rawOtp)

    // Invalidate any existing OTPs for this email and purpose
    await OTP.deleteMany({ email: normalizedEmail, purpose: 'email_verification' })

    // Store hashed OTP
    await OTP.create({
      userId: user._id,
      email: normalizedEmail,
      otpHash,
      purpose: 'email_verification',
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      lastSentAt: new Date(),
    })

    // Send branded email verification OTP asynchronously
    emailService
      .sendEmailVerificationOTP(normalizedEmail, rawOtp, user.name)
      .catch((err) => console.error('Failed to send verification email:', err))

    return res.status(201).json({
      success: true,
      message: 'Registration successful. A 6-digit verification code has been sent to your email.',
      email: normalizedEmail,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/verify-email
 */
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body
    const normalizedEmail = email.toLowerCase().trim()

    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' })
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified. Please log in.' })
    }

    // Find active OTP record
    const otpRecord = await OTP.findOne({
      email: normalizedEmail,
      purpose: 'email_verification',
      consumed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired or is invalid. Please request a new code.',
      })
    }

    // Check attempts
    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      await OTP.deleteOne({ _id: otpRecord._id })
      return res.status(400).json({
        success: false,
        message: 'Maximum verification attempts exceeded. Please request a new code.',
      })
    }

    // Verify OTP
    const isMatch = await verifyOTPHash(otp, otpRecord.otpHash)
    if (!isMatch) {
      otpRecord.attempts += 1
      await otpRecord.save()
      const remaining = MAX_OTP_ATTEMPTS - otpRecord.attempts
      return res.status(400).json({
        success: false,
        message: `Incorrect verification code. ${remaining} attempt(s) remaining.`,
      })
    }

    // Mark OTP consumed & delete
    otpRecord.consumed = true
    await otpRecord.save()
    await OTP.deleteMany({ email: normalizedEmail, purpose: 'email_verification' })

    // Activate user
    user.isEmailVerified = true

    // Generate tokens & session
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const clientInfo = getClientInfo(req)

    user.refreshTokens.push({
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userAgent: clientInfo.userAgent,
      ip: clientInfo.ip,
    })
    await user.save()

    // Set HttpOnly cookie
    setRefreshTokenCookie(res, refreshToken)

    return res.json({
      success: true,
      message: 'Email verified successfully. Welcome to NoWay.',
      accessToken,
      user: user.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/resend-email-otp
 */
export const resendEmailOtp = async (req, res, next) => {
  try {
    const { email } = req.body
    const normalizedEmail = email.toLowerCase().trim()

    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' })
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified. Please log in.' })
    }

    // Enforce 60-second cooldown
    const latestOtp = await OTP.findOne({
      email: normalizedEmail,
      purpose: 'email_verification',
    }).sort({ createdAt: -1 })

    if (latestOtp && Date.now() - new Date(latestOtp.lastSentAt).getTime() < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil(
        (RESEND_COOLDOWN_MS - (Date.now() - new Date(latestOtp.lastSentAt).getTime())) / 1000
      )
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSeconds} seconds before requesting a new code.`,
        retryAfter: waitSeconds,
      })
    }

    // Invalidate previous OTPs
    await OTP.deleteMany({ email: normalizedEmail, purpose: 'email_verification' })

    // Generate and send new OTP
    const rawOtp = generateNumericOTP()
    const otpHash = await hashOTP(rawOtp)

    await OTP.create({
      userId: user._id,
      email: normalizedEmail,
      otpHash,
      purpose: 'email_verification',
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      lastSentAt: new Date(),
    })

    emailService
      .sendEmailVerificationOTP(normalizedEmail, rawOtp, user.name)
      .catch((err) => console.error('Failed to resend verification email:', err))

    return res.json({
      success: true,
      message: 'A new 6-digit verification code has been sent to your email.',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const normalizedEmail = email.toLowerCase().trim()

    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    // If email is not yet verified, require email verification
    if (!user.isEmailVerified) {
      // Trigger verification OTP
      const rawOtp = generateNumericOTP()
      const otpHash = await hashOTP(rawOtp)
      await OTP.deleteMany({ email: normalizedEmail, purpose: 'email_verification' })
      await OTP.create({
        userId: user._id,
        email: normalizedEmail,
        otpHash,
        purpose: 'email_verification',
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
        lastSentAt: new Date(),
      })
      emailService.sendEmailVerificationOTP(normalizedEmail, rawOtp, user.name).catch(() => {})

      return res.status(403).json({
        success: false,
        requiresEmailVerification: true,
        message: 'Your email address is not yet verified. A 6-digit verification code has been sent to your inbox.',
        email: normalizedEmail,
      })
    }

    // 2FA Flow: Check if 2FA is enabled (default true per requirements)
    if (user.isTwoFactorEnabled) {
      const rawOtp = generateNumericOTP()
      const otpHash = await hashOTP(rawOtp)
      const tempToken = crypto.randomUUID()

      // Invalidate any previous 2FA OTPs for this user
      await OTP.deleteMany({ userId: user._id, purpose: '2fa_login' })

      await OTP.create({
        userId: user._id,
        email: normalizedEmail,
        otpHash,
        purpose: '2fa_login',
        tempToken,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
        lastSentAt: new Date(),
      })

      emailService.send2FALoginOTP(normalizedEmail, rawOtp, user.name).catch(() => {})

      return res.json({
        success: true,
        requires2FA: true,
        tempToken,
        message: 'Two-step verification required. A 6-digit code has been sent to your email.',
        email: normalizedEmail,
      })
    }

    // Direct login if 2FA is explicitly disabled
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const clientInfo = getClientInfo(req)

    user.refreshTokens.push({
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userAgent: clientInfo.userAgent,
      ip: clientInfo.ip,
    })
    await user.save()

    setRefreshTokenCookie(res, refreshToken)

    return res.json({
      success: true,
      message: 'Login successful.',
      accessToken,
      user: user.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/verify-2fa
 */
export const verify2FA = async (req, res, next) => {
  try {
    const { tempToken, otp } = req.body

    const otpRecord = await OTP.findOne({
      tempToken,
      purpose: { $in: ['2fa_login', 'google_2fa'] },
      consumed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Verification challenge has expired or is invalid. Please log in again.',
      })
    }

    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      await OTP.deleteOne({ _id: otpRecord._id })
      return res.status(400).json({
        success: false,
        message: 'Maximum verification attempts exceeded. Please log in again.',
      })
    }

    const isMatch = await verifyOTPHash(otp, otpRecord.otpHash)
    if (!isMatch) {
      otpRecord.attempts += 1
      await otpRecord.save()
      const remaining = MAX_OTP_ATTEMPTS - otpRecord.attempts
      return res.status(400).json({
        success: false,
        message: `Incorrect code. ${remaining} attempt(s) remaining.`,
      })
    }

    // Mark consumed and delete
    otpRecord.consumed = true
    await otpRecord.save()
    await OTP.deleteOne({ _id: otpRecord._id })

    const user = await User.findById(otpRecord.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' })
    }

    // Generate tokens & session
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const clientInfo = getClientInfo(req)

    user.refreshTokens.push({
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userAgent: clientInfo.userAgent,
      ip: clientInfo.ip,
    })
    await user.save()

    setRefreshTokenCookie(res, refreshToken)

    // Security alert for successful login
    emailService.sendSecurityAlertEmail(user.email, clientInfo, user.name).catch(() => {})

    return res.json({
      success: true,
      message: 'Login successful.',
      accessToken,
      user: user.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/resend-2fa-otp
 */
export const resend2FAOtp = async (req, res, next) => {
  try {
    const { tempToken } = req.body

    const existingRecord = await OTP.findOne({
      tempToken,
      purpose: { $in: ['2fa_login', 'google_2fa'] },
      consumed: false,
    })

    if (!existingRecord) {
      return res.status(400).json({
        success: false,
        message: 'Active session challenge not found. Please log in again.',
      })
    }

    // 60-second cooldown
    if (Date.now() - new Date(existingRecord.lastSentAt).getTime() < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil(
        (RESEND_COOLDOWN_MS - (Date.now() - new Date(existingRecord.lastSentAt).getTime())) / 1000
      )
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSeconds} seconds before requesting a new code.`,
        retryAfter: waitSeconds,
      })
    }

    const user = await User.findById(existingRecord.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' })
    }

    const rawOtp = generateNumericOTP()
    existingRecord.otpHash = await hashOTP(rawOtp)
    existingRecord.expiresAt = new Date(Date.now() + OTP_EXPIRY_MS)
    existingRecord.lastSentAt = new Date()
    existingRecord.attempts = 0
    await existingRecord.save()

    if (existingRecord.purpose === 'google_2fa') {
      emailService.sendGoogle2FAOTP(user.email, rawOtp, user.name).catch(() => {})
    } else {
      emailService.send2FALoginOTP(user.email, rawOtp, user.name).catch(() => {})
    }

    return res.json({
      success: true,
      message: 'A new 6-digit verification code has been sent to your email.',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/google
 */
export const googleSignIn = async (req, res, next) => {
  try {
    const { credential, role } = req.body

    // Verify Google ID Token with Google Identity Services
    const googleUser = await googleAuthService.verifyGoogleIdToken(credential)
    const { googleId, email, name } = googleUser

    let user = await User.findOne({
      $or: [{ googleId }, { email }],
    })

    if (user) {
      // Link Google ID if user previously registered with email
      if (!user.googleId) {
        user.googleId = googleId
        user.isEmailVerified = true
        await user.save()
      }
    } else {
      // Create new user authenticated via Google
      user = await User.create({
        name,
        email,
        googleId,
        role: role || 'buyer',
        isEmailVerified: true,
        isTwoFactorEnabled: true, // Respect 2FA policy
      })
    }

    // Google Sign-In also respects 2FA
    if (user.isTwoFactorEnabled) {
      const rawOtp = generateNumericOTP()
      const otpHash = await hashOTP(rawOtp)
      const tempToken = crypto.randomUUID()

      await OTP.deleteMany({ userId: user._id, purpose: 'google_2fa' })
      await OTP.create({
        userId: user._id,
        email: user.email,
        otpHash,
        purpose: 'google_2fa',
        tempToken,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
        lastSentAt: new Date(),
      })

      emailService.sendGoogle2FAOTP(user.email, rawOtp, user.name).catch(() => {})

      return res.json({
        success: true,
        requires2FA: true,
        tempToken,
        message: 'Google identity verified. A 6-digit security confirmation code was sent to your email.',
        email: user.email,
      })
    }

    // If 2FA not enabled
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const clientInfo = getClientInfo(req)

    user.refreshTokens.push({
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userAgent: clientInfo.userAgent,
      ip: clientInfo.ip,
    })
    await user.save()

    setRefreshTokenCookie(res, refreshToken)

    return res.json({
      success: true,
      message: 'Google sign-in successful.',
      accessToken,
      user: user.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/refresh
 * Implements token rotation and reuse detection.
 */
export const refreshToken = async (req, res, next) => {
  try {
    const rawToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!rawToken) {
      clearRefreshTokenCookie(res)
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided.',
      })
    }

    let payload
    try {
      payload = jwt.verify(rawToken, process.env.JWT_REFRESH_SECRET || 'change_this_refresh_secret')
    } catch {
      clearRefreshTokenCookie(res)
      return res.status(401).json({
        success: false,
        message: 'Refresh token is invalid or expired. Please log in again.',
      })
    }

    const user = await User.findById(payload.id)
    if (!user) {
      clearRefreshTokenCookie(res)
      return res.status(401).json({ success: false, message: 'User not found.' })
    }

    const incomingTokenHash = hashToken(rawToken)
    const tokenIndex = user.refreshTokens.findIndex(
      (session) => session.tokenHash === incomingTokenHash && session.expiresAt > new Date()
    )

    // Token Reuse Detection:
    // If the token is valid cryptographically, but not found in active sessions,
    // it was already rotated and someone is replaying an old token!
    if (tokenIndex === -1) {
      // Invalidate ALL refresh sessions for this user to mitigate compromise
      user.refreshTokens = []
      await user.save()
      clearRefreshTokenCookie(res)
      return res.status(403).json({
        success: false,
        message: 'Security warning: Refresh token reuse detected. All active sessions have been terminated.',
      })
    }

    // Rotate token: Remove old token from DB
    user.refreshTokens.splice(tokenIndex, 1)

    // Issue brand new access & refresh tokens
    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)
    const clientInfo = getClientInfo(req)

    user.refreshTokens.push({
      tokenHash: hashToken(newRefreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userAgent: clientInfo.userAgent,
      ip: clientInfo.ip,
    })
    await user.save()

    setRefreshTokenCookie(res, newRefreshToken)

    return res.json({
      success: true,
      accessToken: newAccessToken,
      user: user.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    const rawToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (rawToken) {
      const incomingHash = hashToken(rawToken)
      await User.updateOne(
        { 'refreshTokens.tokenHash': incomingHash },
        { $pull: { refreshTokens: { tokenHash: incomingHash } } }
      )
    }

    clearRefreshTokenCookie(res)

    return res.json({
      success: true,
      message: 'Logged out successfully.',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/logout-all
 */
export const logoutAll = async (req, res, next) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' })
    }

    await User.findByIdAndUpdate(userId, { refreshTokens: [] })
    clearRefreshTokenCookie(res)

    return res.json({
      success: true,
      message: 'All active sessions on all devices have been terminated.',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/forgot-password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const normalizedEmail = email.toLowerCase().trim()

    const user = await User.findOne({ email: normalizedEmail })

    // Generic safe response to prevent user enumeration
    const genericResponse = {
      success: true,
      message: 'If an account exists with that email address, a password reset link has been sent.',
    }

    if (!user) {
      return res.json(genericResponse)
    }

    // Generate cryptographically secure random token (32 bytes = 64 hex chars)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')

    user.resetPasswordTokenHash = resetTokenHash
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    await user.save()

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
    const resetUrl = `${clientUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(normalizedEmail)}`

    emailService
      .sendPasswordResetEmail(normalizedEmail, resetUrl, resetToken, user.name)
      .catch((err) => console.error('Failed to send reset password email:', err))

    return res.json(genericResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/auth/reset-password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body
    const normalizedEmail = email.toLowerCase().trim()

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({
      email: normalizedEmail,
      resetPasswordTokenHash: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset link is invalid or has expired. Please request a new one.',
      })
    }

    // Update password with new hash
    user.passwordHash = await bcrypt.hash(newPassword, 12)
    user.resetPasswordTokenHash = null
    user.resetPasswordExpires = null

    // Invalidate all existing refresh sessions on password change
    user.refreshTokens = []
    await user.save()

    clearRefreshTokenCookie(res)

    emailService.sendPasswordChangedEmail(normalizedEmail, user.name).catch(() => {})

    return res.json({
      success: true,
      message: 'Password has been updated successfully. Please log in with your new credentials.',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' })
    }
    return res.json({
      success: true,
      user: user.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
}
