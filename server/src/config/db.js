import mongoose from 'mongoose'
import dns from 'node:dns'
import { config } from './index.js'

export const connectDb = async () => {
  if (!config.mongodbUri) {
    throw new Error('MONGO_URI is not configured')
  }

  // Ensure reliable SRV DNS resolution for mongodb+srv:// on Windows / ISP resolvers
  if (config.mongodbUri.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1'])
    } catch {
      // Ignore if unable to override system DNS servers
    }
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
