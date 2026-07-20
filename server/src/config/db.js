import mongoose from 'mongoose'
import { config } from './index.js'

export const connectDb = async () => {
  return mongoose.connect(config.mongodbUri)
}
