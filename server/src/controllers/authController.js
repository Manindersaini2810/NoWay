import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { config } from '../config/index.js'

const signToken = (user, secret, expiresIn) => {
  if (!secret) throw new Error('JWT secrets are not configured')
  return jwt.sign({ id: user._id.toString(), role: user.role, email: user.email }, secret, { expiresIn })
}

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone
})

const tokenResponse = (user, includeRefreshToken = true) => {
  const data = {
    accessToken: signToken(user, config.jwtSecret, '15m'),
    user: serializeUser(user)
  }
  if (includeRefreshToken) data.refreshToken = signToken(user, config.jwtRefreshSecret, '7d')
  return data
}

export const register = async (req, res, next) => {
  try {
    const { name, firstName, lastName, email, password, role, phone, company } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ success: false, message: 'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 12)
    const fullName = name || [firstName, lastName].filter(Boolean).join(' ')
    const user = await User.create({ name: fullName, email, passwordHash, role: role || 'buyer', phone, company })
    res.status(201).json({ success: true, data: tokenResponse(user) })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    res.json({ success: true, data: tokenResponse(user) })
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (req, res, next) => {
  try {
    if (!config.jwtRefreshSecret) throw new Error('JWT_REFRESH_SECRET is not configured')
    const payload = jwt.verify(req.body.refreshToken, config.jwtRefreshSecret)
    if (typeof payload === 'string' || !payload.id) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' })
    }
    const user = await User.findById(payload.id)
    if (!user) return res.status(401).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: { accessToken: signToken(user, config.jwtSecret, '15m') } })
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' })
    }
    next(error)
  }
}
