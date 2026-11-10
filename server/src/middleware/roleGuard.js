export const roleGuard = (roles = []) => {
  const allowed = Array.isArray(roles) ? roles : [roles]
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: insufficient permissions for this resource.',
      })
    }
    next()
  }
}

export default roleGuard
