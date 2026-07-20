import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (user, secret, expiresIn) =>
  jwt.sign({ id: user._id, role: user.role, email: user.email }, secret, { expiresIn })

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, company } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash, role: role || 'buyer', phone, company })

    const accessToken = signToken(user, process.env.JWT_SECRET, '15m')
    const refreshToken = signToken(user, process.env.JWT_REFRESH_SECRET, '7d')

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: { id: user._id, email: user.email, role: user.role, name: user.name }
      }
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const accessToken = signToken(user, process.env.JWT_SECRET, '15m')
    const refreshToken = signToken(user, process.env.JWT_REFRESH_SECRET, '7d')

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: { id: user._id, email: user.email, role: user.role, name: user.name }
      }
    })
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ success: false, message: 'Refresh token required' })

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(payload.id)
    if (!user) return res.status(401).json({ success: false, message: 'User not found' })

    const accessToken = signToken(user, process.env.JWT_SECRET, '15m')
    res.json({ success: true, data: { accessToken } })
  } catch (error) {
    next({ status: 401, message: 'Invalid refresh token' })
  }
}
