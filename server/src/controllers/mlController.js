import { estimatePropertyPrice } from '../services/mlService.js'

export const predictPrice = async (req, res, next) => {
  try {
    const estimatedPrice = await estimatePropertyPrice({
      area: { totalSqFt: req.body.area },
      propertyType: req.body.propertyType,
      structural: {
        buildingClass: req.body.buildingClass,
        yearBuilt: req.body.yearBuilt,
        floors: req.body.floors,
        parkingSpaces: req.body.parkingSpaces,
        ceilingHeightFt: req.body.ceilingHeightFt,
        occupancyStatus: req.body.occupancyStatus
      },
      location: {
        city: req.body.city,
        geo: { coordinates: [req.body.lng || 0, req.body.lat || 0] }
      }
    })
    res.json({
      success: true,
      data: { estimatedPrice, estimatedPricePerSqFt: estimatedPrice / req.body.area }
    })
  } catch (error) {
    next(error)
  }
}
