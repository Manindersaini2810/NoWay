import { useState, useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import CategorySection from '../components/sections/CategorySection'
import FeaturedProperties from '../components/sections/FeaturedProperties'
import LocationSection from '../components/sections/LocationSection'
import HowItWorks from '../components/sections/HowItWorks'
import CTASection from '../components/sections/CTASection'
import propertyApi from '../services/propertyApi'
import userApi from '../services/userApi'

export default function Home() {
  const [properties, setProperties] = useState([])
  const [wishlistIds, setWishlistIds] = useState([])

  useEffect(() => {
    let isMounted = true

    async function loadInitialData() {
      try {
        const [propData, favData] = await Promise.all([
          propertyApi.getProperties({ limit: 12 }),
          userApi.getFavorites().catch(() => []),
        ])

        if (isMounted) {
          const items = propData?.items || []
          setProperties(items)
          setWishlistIds(Array.isArray(favData) ? favData.map((f) => f._id || f.id || f) : [])
        }
      } catch (err) {
        console.error('Failed to load home properties:', err)
      }
    }

    loadInitialData()
    return () => {
      isMounted = false
    }
  }, [])

  const handleWishlistToggle = async (propertyId) => {
    const isSaved = wishlistIds.includes(propertyId)
    if (isSaved) {
      setWishlistIds((prev) => prev.filter((id) => id !== propertyId))
      await userApi.removeFavorite(propertyId).catch(() => {})
    } else {
      setWishlistIds((prev) => [...prev, propertyId])
      await userApi.addFavorite(propertyId).catch(() => {})
    }
  }

  const featured = properties.slice(0, 6)
  const recent = properties.slice(6, 12).length ? properties.slice(6, 12) : properties.slice(0, 6)

  return (
    <div className="space-y-4">
      {/* 1. Large Hero Section */}
      <HeroSection />

      {/* 2. Explore by Category */}
      <CategorySection />

      {/* 3. Featured Commercial Properties & Recent Listings with 360Ghar interactive modal */}
      <FeaturedProperties
        featuredListings={featured}
        recentListings={recent}
        onWishlistToggle={handleWishlistToggle}
        wishlistIds={wishlistIds}
      />

      {/* 4. Prime Indian & Global Locations */}
      <LocationSection />

      {/* 5. How NoWay Works */}
      <HowItWorks />

      {/* 6. Call To Action */}
      <CTASection />
    </div>
  )
}
