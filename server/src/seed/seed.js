import { connectDb } from '../config/db.js'
import Property from '../models/Property.js'
import mongoose from 'mongoose'

const listings = [
  ['Harbor Point Tower', 'Premium downtown office tower with flexible floor plans and modern amenities.', 'office', 2850000, 18200, 'Seattle', 'Class A', 2019, 22, 12, 320, 'Commercial Mixed Use', 'Occupied', [-122.3321, 47.6062]],
  ['North Market Retail Plaza', 'High-footfall retail center with excellent commuter-route frontage.', 'retail', 1280000, 9600, 'Austin', 'Class B', 2011, 2, 14, 110, 'Retail Corridor', 'Occupied', [-97.7431, 30.2672]],
  ['Summit Logistics Hub', 'Modern fulfillment warehouse with high clear heights and dock access.', 'warehouse', 2140000, 24800, 'Denver', 'Class A', 2020, 1, 32, 90, 'Industrial Flex', 'Vacant', [-104.9903, 39.7392]],
  ['Cedar Industrial Plaza', 'Flexible industrial space for manufacturing, storage, and distribution.', 'industrial', 1650000, 15600, 'Phoenix', 'Class B', 2008, 1, 24, 70, 'Light Industrial', 'Occupied', [-112.074, 33.4484]],
  ['Union Square Offices', 'Contemporary office asset with panoramic views and smart building systems.', 'office', 3320000, 21400, 'Chicago', 'Class A', 2017, 18, 11, 250, 'Downtown Office', 'Occupied', [-87.6298, 41.8781]],
  ['Riverfront Retail Lofts', 'Creative retail and showroom space with strong street visibility.', 'retail', 990000, 7800, 'Miami', 'Class C', 1998, 3, 13, 40, 'Mixed Retail', 'Occupied', [-80.1918, 25.7617]],
  ['Blue Ridge Distribution Center', 'Large distribution center with multiple loading docks and highway access.', 'warehouse', 2460000, 31200, 'Atlanta', 'Class A', 2022, 1, 36, 140, 'Logistics Park', 'Vacant', [-84.388, 33.749]],
  ['Lakeside Flex Campus', 'Flexible industrial campus for light manufacturing and workshop use.', 'industrial', 1780000, 13400, 'Dallas', 'Class A', 2014, 2, 20, 95, 'Flex Industrial', 'Occupied', [-96.797, 32.7767]],
  ['West Loop Mixed-Use Center', 'Adaptable mixed-use asset with ground-floor retail and upper-level offices.', 'mixed-use', 4100000, 26500, 'Chicago', 'Class A', 2021, 10, 12, 180, 'Mixed Use', 'Occupied', [-87.6476, 41.8827]],
  ['Mesa Development Parcel', 'Commercial land parcel with convenient regional-road access.', 'land', 720000, 18000, 'Phoenix', 'Class B', 2005, 1, 0, 35, 'Commercial', 'Vacant', [-112.0306, 33.4152]]
]

const seed = async () => {
  await connectDb()
  for (const [title, description, propertyType, price, area, city, buildingClass, yearBuilt, floors, ceilingHeightFt, parkingSpaces, zoning, occupancyStatus, coordinates] of listings) {
    await Property.updateOne(
      { title },
      {
        $set: {
          title,
          description,
          listingType: 'sale',
          propertyType,
          price,
          pricePerSqFt: Math.round(price / area),
          area: { totalSqFt: area, lotSqFt: area * 1.4 },
          structural: { yearBuilt, buildingClass, floors, ceilingHeightFt, parkingSpaces, loadingDocks: propertyType === 'warehouse' ? 8 : 0, zoning, occupancyStatus },
          location: {
            address: `Commercial District, ${city}`,
            city,
            state: city === 'Seattle' ? 'Washington' : city === 'Austin' ? 'Texas' : city === 'Denver' ? 'Colorado' : city === 'Phoenix' ? 'Arizona' : city === 'Chicago' ? 'Illinois' : city === 'Miami' ? 'Florida' : city === 'Atlanta' ? 'Georgia' : 'Texas',
            country: 'United States',
            zip: '00000',
            geo: { type: 'Point', coordinates }
          },
          media: { images: [], floorPlans: [], documents: [] },
          amenities: ['On-site parking', 'Public transit access'],
          status: 'active'
        }
      },
      { upsert: true, runValidators: true }
    )
  }
  console.info(`Seeded ${listings.length} commercial listings`)
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
