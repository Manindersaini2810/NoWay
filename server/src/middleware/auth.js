import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { config } from '../config/index.js'

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    let token = null

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No token provided.',
      })
    }

    if (!config.jwtSecret) {
      return next(new Error('JWT_SECRET is not configured on the server'))
    }

    const payload = jwt.verify(token, config.jwtSecret)
    if (!payload || !payload.id) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' })
    }

    const user = await User.findById(payload.id)
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' })
    }

    // Attach user information to request
    req.user = {
      id: user._id.toString(),
      _id: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
      isEmailVerified: user.isEmailVerified,
    }
    req.currentUserDoc = user

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token has expired. Please refresh your session.',
        expired: true,
      })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      })
    }
    next(error)
  }
}

export default auth
