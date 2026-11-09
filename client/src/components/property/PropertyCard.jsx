import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Maximize2, Shield, Heart, Sparkles, Layers } from 'lucide-react'

export default function PropertyCard({
  property,
  index = 0,
  onClick,
  onWishlistToggle,
  isWishlisted: propIsWishlisted,
}) {
  const [localWishlisted, setLocalWishlisted] = useState(false)
  const isWishlisted = propIsWishlisted !== undefined ? propIsWishlisted : localWishlisted

  const id = property._id || property.id
  const imageUrl =
    property.media?.images?.[0] ||
    property.images?.[0] ||
    property.thumbnail ||
    property.image ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'

  const listingType = (property.listingType || 'sale').toLowerCase()
  const propertyType = (property.propertyType || 'Commercial').toUpperCase()
  const title = property.title || 'Untitled Commercial Asset'
  const city = property.location?.city || property.city || 'Prime Location'
  const state = property.location?.state || property.state || ''
  const locationText = state ? `${city}, ${state}` : city

  const isINR = property.currency === 'INR' || String(id).startsWith('ind-')
  const currencySymbol = isINR ? '₹' : '$'

  const formattedPrice =
    property.priceFormatted ||
    (isINR
      ? `₹${((property.price || 0) / 100000).toFixed(1)} L`
      : `$${(property.price || 0).toLocaleString()}`)

  const areaSqFt =
    property.area?.totalSqFt ||
    (typeof property.area === 'number' ? property.area : property.areaSize || 0)
  const formattedArea =
    property.area?.displayArea || (areaSqFt ? `${areaSqFt.toLocaleString()} sq ft` : 'N/A')

  const buildingClass =
    property.structural?.buildingClass || property.buildingClass || 'Class A'

  const floorsOrCapacity =
    property.structural?.floors
      ? `${property.structural.floors} Floors`
      : property.structural?.loadingDocks
      ? `${property.structural.loadingDocks} Docks`
      : property.specs?.floors
      ? `${property.specs.floors} Fl`
      : property.plotArea
      ? property.plotArea
      : 'Grade A'

  const hasMlEstimate = Boolean(property.mlEstimatedPrice)

  const handleHeartClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onWishlistToggle) {
      onWishlistToggle(id)
    } else {
      setLocalWishlisted((prev) => !prev)
    }
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(property)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4) }}
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#EDE4D4] rounded-2xl overflow-hidden cursor-pointer border border-[#C8BAA0] hover:border-[#1E1E1C] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 w-full select-none"
    >
      {/* Top Image Section with Zoom */}
      <div className="relative h-56 sm:h-60 overflow-hidden shrink-0 bg-[#1E1E1C]">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
          }}
        />

        {/* Charcoal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1C] via-[#1E1E1C]/25 to-transparent" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Electric Blue / Charcoal Badges */}
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm ${
                listingType === 'lease'
                  ? 'bg-[#2F6BFF] text-white'
                  : 'bg-[#1E1E1C] text-[#D8CBB3] border border-[#383833]'
              }`}
            >
              For {listingType === 'lease' ? 'Lease' : 'Sale'}
            </span>

            {hasMlEstimate && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-[#2F6BFF] text-white flex items-center gap-1 shadow-sm">
                <Sparkles size={12} className="text-white" />
                <span>AI Valued</span>
              </span>
            )}
          </div>

          {/* Heart Favorite Button (Electric Blue active state) */}
          <button
            type="button"
            onClick={handleHeartClick}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              isWishlisted
                ? 'bg-[#2F6BFF] text-white scale-105 shadow-[#2F6BFF]/30'
                : 'bg-[#1E1E1C]/80 hover:bg-[#1E1E1C] text-[#D8CBB3] hover:text-[#2F6BFF]'
            }`}
          >
            <Heart
              size={15}
              className={isWishlisted ? 'fill-white text-white' : ''}
            />
          </button>
        </div>

        {/* Bottom Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-[#D8CBB3] pointer-events-none">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
              {formattedPrice}
              {listingType === 'lease' && (
                <span className="text-xs font-normal text-[#D8CBB3] ml-1">/mo</span>
              )}
            </div>
            {property.pricePerSqFt && (
              <span className="text-[11px] text-[#D8CBB3]/80 font-medium">
                {currencySymbol}
                {property.pricePerSqFt} / sq ft
              </span>
            )}
          </div>

          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#1E1E1C] text-[#D8CBB3] border border-[#383833]">
            {propertyType}
          </span>
        </div>
      </div>

      {/* Content Section (Sand surface + Charcoal text) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-[#EDE4D4]">
        {/* Title */}
        <h3
          className="text-base font-black text-[#1E1E1C] group-hover:text-[#2F6BFF] transition-colors duration-200 line-clamp-1 mb-1"
          title={title}
        >
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-[#1E1E1C]/70 font-semibold mb-3">
          <MapPin size={13} className="text-[#2F6BFF] shrink-0" />
          <span className="truncate">{locationText}</span>
        </div>

        {/* 3-Column Specifications Grid (Sand on Sand) */}
        <div className="grid grid-cols-3 py-2.5 px-2 rounded-xl bg-[#D8CBB3] border border-[#C8BAA0] gap-1 mt-auto text-center">
          {/* Spec 1: Area */}
          <div className="px-1">
            <div className="flex items-center justify-center text-[#2F6BFF] mb-0.5">
              <Maximize2 size={13} />
            </div>
            <div className="font-black text-xs text-[#1E1E1C] truncate">
              {formattedArea}
            </div>
            <div className="text-[10px] text-[#1E1E1C]/60 uppercase font-black tracking-wider">
              Area
            </div>
          </div>

          {/* Spec 2: Class */}
          <div className="px-1 border-l border-r border-[#C8BAA0]">
            <div className="flex items-center justify-center text-[#2F6BFF] mb-0.5">
              <Shield size={13} />
            </div>
            <div className="font-black text-xs text-[#1E1E1C] truncate">
              {buildingClass}
            </div>
            <div className="text-[10px] text-[#1E1E1C]/60 uppercase font-black tracking-wider">
              Rating
            </div>
          </div>

          {/* Spec 3: Capacity / Floors */}
          <div className="px-1">
            <div className="flex items-center justify-center text-[#2F6BFF] mb-0.5">
              <Layers size={13} />
            </div>
            <div className="font-black text-xs text-[#1E1E1C] truncate">
              {floorsOrCapacity}
            </div>
            <div className="text-[10px] text-[#1E1E1C]/60 uppercase font-black tracking-wider">
              Specs
            </div>
          </div>
        </div>

        {/* Action Button: Charcoal to Electric Blue on Hover */}
        <div className="mt-3.5">
          <button
            type="button"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-[#1E1E1C] group-hover:bg-[#2F6BFF] text-[#D8CBB3] group-hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-[#2F6BFF]/25"
          >
            <span>View Details</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
