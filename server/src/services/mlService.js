import axios from 'axios'

export const estimatePropertyPrice = async (property) => {
  try {
    const payload = {
      area: property.area.totalSqFt,
      propertyType: property.propertyType,
      buildingClass: property.structural?.buildingClass || 'Class A',
      yearBuilt: property.structural?.yearBuilt || 2000,
      floors: property.structural?.floors || 1,
      parking: property.structural?.parkingSpaces || 0,
      city: property.location?.city || 'Unknown',
      lat: property.location?.geo?.coordinates?.[1] || 0,
      lng: property.location?.geo?.coordinates?.[0] || 0,
      ceilingHeight: property.structural?.ceilingHeightFt || 10,
      occupancyStatus: property.structural?.occupancyStatus || 'Occupied'
    }

    const response = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, payload, { timeout: 5000 })
    return response.data.estimatedPrice
  } catch (error) {
    console.warn('ML service call failed, using fallback', error.message)
    return property.price
  }
}
