import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    listingType: { type: String, enum: ['sale', 'lease'], required: true },
    propertyType: { type: String, enum: ['office', 'retail', 'warehouse', 'industrial', 'land', 'mixed-use'], required: true },
    price: { type: Number, required: true },
    pricePerSqFt: { type: Number },
    capRate: { type: Number },
    area: {
      totalSqFt: { type: Number, required: true },
      lotSqFt: { type: Number }
    },
    structural: {
      yearBuilt: Number,
      buildingClass: { type: String, enum: ['Class A', 'Class B', 'Class C'] },
      floors: Number,
      ceilingHeightFt: Number,
      parkingSpaces: Number,
      loadingDocks: Number,
      hvacType: String,
      zoning: String,
      occupancyStatus: { type: String, enum: ['Vacant', 'Occupied'] }
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      zip: String,
      geo: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          validate: {
            validator: (coordinates) => !coordinates || coordinates.length === 2,
            message: 'GeoJSON coordinates must be [longitude, latitude]'
          }
        }
      }
    },
    media: {
      images: [{ type: String }],
      floorPlans: [{ type: String }],
      documents: [{ type: String }]
    },
    amenities: [{ type: String }],
    brokerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'pending', 'sold', 'leased'], default: 'active' },
    mlEstimatedPrice: { type: Number },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
)

propertySchema.index({ 'location.geo': '2dsphere' })

const Property = mongoose.model('Property', propertySchema)
export default Property
