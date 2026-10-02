import mongoose from 'mongoose'
import { config } from './index.js'

export const connectDb = async () => {
  if (!config.mongodbUri) {
    throw new Error('MONGO_URI is not configured')
  }

  mongoose.connection.on('connected', () => console.info('MongoDB connected'))
  mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error.message))
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'))

  try {
    await mongoose.connect(config.mongodbUri)
  } catch (error) {
    console.error('MongoDB initial connection failed:', error.message)
    throw error
  }

  return mongoose.connection
}
