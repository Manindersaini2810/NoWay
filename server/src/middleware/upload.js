import multer from 'multer'
import cloudinary from '../config/cloudinary.js'

const parser = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 12 },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Only image uploads are supported'))
    }
    callback(null, true)
  }
})

const uploadToCloudinary = (file) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { resource_type: 'image', folder: 'noway/properties' },
    (error, result) => {
      if (error) return reject(error)
      if (!result?.secure_url) return reject(new Error('Cloudinary did not return an image URL'))
      resolve(result.secure_url)
    }
  )
  stream.end(file.buffer)
})

export const uploadImages = (req, res, next) => {
  parser.array('images', 12)(req, res, async (error) => {
    if (error) return next(error)

    try {
      const files = req.files || []
      req.uploadedImageUrls = await Promise.all(files.map(uploadToCloudinary))
      next()
    } catch (uploadError) {
      next(uploadError)
    }
  })
}

export const parsePropertyPayload = (req, res, next) => {
  try {
    if (typeof req.body.data === 'string') {
      req.body = { ...JSON.parse(req.body.data) }
    }

    if (req.body.area && typeof req.body.area === 'string') req.body.area = JSON.parse(req.body.area)
    if (req.body.structural && typeof req.body.structural === 'string') req.body.structural = JSON.parse(req.body.structural)
    if (req.body.location && typeof req.body.location === 'string') req.body.location = JSON.parse(req.body.location)
    if (req.body.media && typeof req.body.media === 'string') req.body.media = JSON.parse(req.body.media)
    if (req.body.amenities && typeof req.body.amenities === 'string') req.body.amenities = JSON.parse(req.body.amenities)
    next()
  } catch (error) {
    next({ status: 400, message: 'Multipart property data must contain valid JSON values' })
  }
}
