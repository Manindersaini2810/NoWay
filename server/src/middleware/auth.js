import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required' })
    }

    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id)
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    req.user = { id: user._id, role: user.role, email: user.email }
    next()
  } catch (error) {
    next({ status: 401, message: 'Invalid or expired token' })
  }
}
