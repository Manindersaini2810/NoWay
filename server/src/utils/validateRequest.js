export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true })
    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ')
      return next({ status: 400, message, details: error.details })
    }
    next()
  }
}
