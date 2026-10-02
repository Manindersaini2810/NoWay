export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err)

  const status = err.status || err.statusCode ||
    (err.name === 'ValidationError' || err.name === 'MulterError' ? 400 : 500)
  if (status >= 500) console.error(err)
  const message = err.name === 'CastError'
    ? 'Invalid identifier'
    : err.name === 'ValidationError'
      ? 'Request validation failed'
      : err.code === 11000
        ? 'A record with this value already exists'
        : err.message || 'Internal Server Error'
  res.status(status).json({
    success: false,
    message,
    details: err.details || (err.code === 11000 ? err.keyValue : null)
  })
}
