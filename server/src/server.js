import app from './app.js'
import { connectDb } from './config/db.js'
import { config } from './config/index.js'
import { scheduleSavedSearchAlerts } from './services/savedSearchService.js'

const startServer = async () => {
  await connectDb()
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_FROM) {
    scheduleSavedSearchAlerts()
  }

  const server = app.listen(config.port, () => {
    console.info(`NoWay API listening on http://localhost:${config.port}`)
  })

  const shutdown = (signal) => {
    console.info(`${signal} received; shutting down`)
    server.close(() => process.exit(0))
  }
  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

startServer().catch((error) => {
  console.error('Server startup failed:', error)
  process.exitCode = 1
})

/*
Quick API checks (replace TOKEN, IDs, and credentials as needed):
curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"NoWay Broker\",\"email\":\"broker@example.com\",\"password\":\"ChangeMe123!\",\"role\":\"broker\"}"
curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"broker@example.com\",\"password\":\"ChangeMe123!\"}"
curl -X POST http://localhost:4000/api/properties -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d "{\"title\":\"Downtown Office\",\"description\":\"Office listing\",\"listingType\":\"sale\",\"propertyType\":\"office\",\"price\":2500000,\"area\":{\"totalSqFt\":12000},\"structural\":{\"buildingClass\":\"Class A\",\"yearBuilt\":2018,\"floors\":8,\"parkingSpaces\":80,\"ceilingHeightFt\":12,\"occupancyStatus\":\"Occupied\"},\"location\":{\"city\":\"Seattle\",\"geo\":{\"type\":\"Point\",\"coordinates\":[-122.3321,47.6062]}}}"
curl "http://localhost:4000/api/properties?propertyType=office&city=Seattle&minPrice=1000000&maxArea=20000&page=1&sort=-price"
curl "http://localhost:4000/api/properties/nearby?lat=47.6062&lng=-122.3321&radiusKm=10"
*/
