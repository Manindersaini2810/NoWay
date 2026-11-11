import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import savedSearchRoutes from './routes/savedSearchRoutes.js'
import mlRoutes from './routes/mlRoutes.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

// Trust reverse proxy headers (required for Render, Vercel, Railway rate-limiting & secure cookies)
app.set('trust proxy', 1)

// 1. Security HTTP Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
)

// 2. CORS with Credentials (for HttpOnly refresh cookies)
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)

// 3. Request Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// 4. Body & Cookie Parsing
app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true, limit: '15mb' }))
app.use(cookieParser(process.env.COOKIE_SECRET || 'noway_cookie_secret_key_2026'))

// 5. Global API Rate Limiting
app.use('/api', apiLimiter)

// 6. Application Routes
app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/saved-searches', savedSearchRoutes)
app.use('/api/ml', mlRoutes)

// 7. 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' })
})

// 8. Global Error Handler
app.use(errorHandler)

export default app
