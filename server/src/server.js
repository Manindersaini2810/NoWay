import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { scheduleSavedSearchAlerts } from './services/savedSearchService.js'

dotenv.config()

const PORT = process.env.PORT || 4000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
    scheduleSavedSearchAlerts()
  })
  .catch((error) => {
    console.error('MongoDB connection error', error)
    process.exit(1)
  })
