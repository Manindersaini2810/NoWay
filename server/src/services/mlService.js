import axios from 'axios'
import { config } from '../config/index.js'

export const getPropertyFeatures = (property) => ({
  area: Number(property.area?.totalSqFt || 0),
  propertyType: property.propertyType,
  buildingClass: property.structural?.buildingClass || 'Class B',
  yearBuilt: Number(property.structural?.yearBuilt || 2000),
  floors: Number(property.structural?.floors || 1),
  parkingSpaces: Number(property.structural?.parkingSpaces || 0),
  city: property.location?.city || 'Unknown',
  lat: Number(property.location?.geo?.coordinates?.[1] || 0),
  lng: Number(property.location?.geo?.coordinates?.[0] || 0),
  ceilingHeightFt: Number(property.structural?.ceilingHeightFt || 10),
  occupancyStatus: property.structural?.occupancyStatus || 'Occupied'
})

export const estimatePropertyPrice = async (property) => {
  const { data } = await axios.post(`${config.mlServiceUrl}/predict`, getPropertyFeatures(property), {
    timeout: 10000
  })
  if (!Number.isFinite(data.estimatedPrice)) {
    throw new Error('ML service returned an invalid estimatedPrice')
  }
  return data.estimatedPrice
}
