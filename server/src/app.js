import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import savedSearchRoutes from './routes/savedSearchRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/saved-searches', savedSearchRoutes)

app.use(errorHandler)

export default app
