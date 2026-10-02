import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { config } from '../config/index.js'

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required' })
    }

    const token = authHeader.split(' ')[1]
    if (!config.jwtSecret) {
      return next(new Error('JWT_SECRET is not configured'))
    }
    const payload = jwt.verify(token, config.jwtSecret)
    const user = await User.findById(payload.id)
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    req.user = { id: user._id.toString(), role: user.role, email: user.email }
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
    next(error)
  }
}
