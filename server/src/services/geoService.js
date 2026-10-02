import Property from '../models/Property.js'

export const findNearbyProperties = ({ latitude, longitude, radiusMeters }) =>
  Property.find({
    status: 'active',
    'location.geo': {
      $near: {
        $geometry: { type: 'Point', coordinates: [longitude, latitude] },
        $maxDistance: radiusMeters
      }
    }
  }).limit(20).populate('brokerId', 'name email company')
