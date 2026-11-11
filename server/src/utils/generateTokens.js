import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { config } from '../config/index.js'

/**
 * Hash a token string using SHA-256 for secure database storage.
 */
export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * Generates an Access JWT (15 minutes).
 */
export const generateAccessToken = (user) => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not configured')
  }
  return jwt.sign(
    {
      id: user._id ? user._id.toString() : user.id,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: '15m' }
  )
}

/**
 * Generates a Refresh JWT (7 days).
 */
export const generateRefreshToken = (user, jti = crypto.randomUUID()) => {
  if (!config.jwtRefreshSecret) {
    throw new Error('JWT_REFRESH_SECRET is not configured')
  }
  return jwt.sign(
    {
      id: user._id ? user._id.toString() : user.id,
      jti,
    },
    config.jwtRefreshSecret,
    { expiresIn: '7d' }
  )
}

/**
 * Sets the Refresh Token in a secure HttpOnly cookie.
 */
export const setRefreshTokenCookie = (res, refreshToken) => {
  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax', // 'none' + secure allows cross-origin Vercel <-> Render cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    path: '/api/auth', // restricted to auth endpoints for security
  })
}

/**
 * Clears the Refresh Token HttpOnly cookie.
 */
export const clearRefreshTokenCookie = (res) => {
  const isProduction = process.env.NODE_ENV === 'production'
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/api/auth',
  })
}
