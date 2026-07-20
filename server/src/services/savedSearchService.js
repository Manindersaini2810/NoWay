import cron from 'node-cron'
import SavedSearch from '../models/SavedSearch.js'
import Property from '../models/Property.js'
import User from '../models/User.js'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const buildFilter = (filters) => {
  const query = { status: 'active' }
  if (filters.propertyType) query.propertyType = filters.propertyType
  if (filters.listingType) query.listingType = filters.listingType
  if (filters.city) query['location.city'] = filters.city
  if (filters.minPrice) query.price = { ...query.price, $gte: Number(filters.minPrice) }
  if (filters.maxPrice) query.price = { ...query.price, $lte: Number(filters.maxPrice) }
  return query
}

export const scheduleSavedSearchAlerts = () => {
  cron.schedule('0 8 * * *', async () => {
    try {
      const savedSearches = await SavedSearch.find({})
      for (const savedSearch of savedSearches) {
        const filter = buildFilter(savedSearch.filters)
        const newProperties = await Property.find(filter).sort({ createdAt: -1 }).limit(5)
        const user = await User.findById(savedSearch.userId)
        if (!user) continue

        const shouldNotify = !savedSearch.lastNotifiedAt || new Date() - savedSearch.lastNotifiedAt > 24 * 60 * 60 * 1000
        if (!shouldNotify) continue

        const html = `<p>New listing matches your saved search:</p><ul>${newProperties.map((property) => `<li>${property.title} - $${property.price.toLocaleString()}</li>`).join('')}</ul>`
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: 'NoWay saved search alert',
          html
        })
        savedSearch.lastNotifiedAt = new Date()
        await savedSearch.save()
      }
    } catch (error) {
      console.error('Saved search alert failed', error)
    }
  })
}
