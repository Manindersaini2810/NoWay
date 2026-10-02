export const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
      convert: true
    })
    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ')
      return next({ status: 400, message, details: error.details })
    }
    req[property] = value
    next()
  }
}
