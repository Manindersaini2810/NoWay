import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineLocationMarker,
  HiOutlineHome,
  HiOutlineEye,
  HiHeart,
  HiOutlineHeart,
  HiShieldCheck,
} from 'react-icons/hi'
import { HiArrowsPointingOut } from 'react-icons/hi2'

const PropertyCard = ({ property, onWishlistToggle, isWishlisted: propIsWishlisted }) => {
  const [localWishlisted, setLocalWishlisted] = useState(false)
  const isWishlisted = propIsWishlisted !== undefined ? propIsWishlisted : localWishlisted

  const id = property._id || property.id
  const imageUrl =
    property.media?.images?.[0] ||
    property.images?.[0] ||
    property.image ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'

  const listingType = (property.listingType || 'sale').toLowerCase()
  const propertyType = property.propertyType || 'Commercial'
  const title = property.title || 'Untitled Commercial Property'
  const city = property.location?.city || property.city || 'Prime Location'
  const state = property.location?.state || property.state || ''
  const locationText = state ? `${city}, ${state}` : city

  const price = property.price || 0
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

  const areaSqFt =
    property.area?.totalSqFt ||
    (typeof property.area === 'number' ? property.area : property.areaSize || 0)
  const formattedArea = areaSqFt ? `${areaSqFt.toLocaleString()} sq ft` : 'N/A'

  const buildingClass =
    property.structural?.buildingClass || property.buildingClass || 'Class A'

  const floors =
    property.structural?.floors ||
    property.specs?.floors ||
    (property.structural?.loadingDocks
      ? `${property.structural.loadingDocks} Docks`
      : '1 Floor')

  const hasMlEstimate = Boolean(property.mlEstimatedPrice)
  const views = property.views || 42

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onWishlistToggle) {
      onWishlistToggle(id)
    } else {
      setLocalWishlisted((prev) => !prev)
    }
  }

  return (
    <article className="fade-in group flex flex-col bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border border-gray-200/90 group-hover:border-slate-900 relative w-full hover:-translate-y-2">
      {/* Top Image Section */}
      <div className="relative h-[220px] overflow-hidden shrink-0 bg-slate-900">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md ${
                listingType === 'lease'
                  ? 'bg-sky-600/95 border border-sky-400/40'
                  : 'bg-emerald-600/95 border border-emerald-400/40'
              }`}
            >
              For {listingType === 'lease' ? 'Lease' : 'Sale'}
            </span>

            {hasMlEstimate && (
              <span className="bg-teal-600/95 text-white border border-teal-400/40 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm backdrop-blur-md">
                <HiShieldCheck className="h-3.5 w-3.5" />
                <span>ML Verified</span>
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`pointer-events-auto flex items-center justify-center w-8 h-8 rounded-full border-none cursor-pointer shadow-md transition-all duration-200 z-10 hover:scale-110 active:scale-95 ${
              isWishlisted
                ? 'bg-white text-rose-500'
                : 'bg-white/90 text-gray-500 hover:text-rose-500 hover:bg-white'
            }`}
          >
            {isWishlisted ? (
              <HiHeart className="h-5 w-5 fill-rose-500" />
            ) : (
              <HiOutlineHeart className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Price Overlay Gradient */}
        <div className="absolute bottom-0 left-0 right-0 pt-8 pb-3 px-4 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent text-white flex items-end justify-between">
          <div>
            <p className="text-[1.5rem] font-extrabold leading-none tracking-tight text-white m-0 drop-shadow-sm">
              {formattedPrice}
              {listingType === 'lease' && (
                <span className="text-xs font-medium text-slate-200 ml-1">/mo</span>
              )}
            </p>
            {property.pricePerSqFt && (
              <span className="text-[11px] text-slate-200 font-medium">
                ${property.pricePerSqFt}/sq ft
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
            <HiOutlineEye className="h-3.5 w-3.5" />
            <span>{views} views</span>
          </div>
        </div>
      </div>

      {/* Content Section - Transitions to black/slate-950 on hover */}
      <div className="p-5 flex flex-col flex-1 bg-white transition-colors duration-300 group-hover:bg-slate-950">
        {/* Property Type */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.75rem] font-bold text-teal-600 transition-colors duration-300 group-hover:text-teal-400 uppercase tracking-wider">
            {propertyType}
          </span>
          <span className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-slate-400 font-medium">
            {buildingClass}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[1.125rem] font-bold text-gray-900 transition-colors duration-300 group-hover:text-white mt-0.5 mb-1.5 truncate"
          title={title}
        >
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 transition-colors duration-300 group-hover:text-slate-300 text-[0.875rem] mb-4">
          <HiOutlineLocationMarker className="h-4 w-4 text-teal-600 transition-colors duration-300 group-hover:text-teal-400 shrink-0" />
          <span className="truncate">{locationText}</span>
        </div>

        {/* 3-Column Specs Grid */}
        <div className="grid grid-cols-3 py-3 border-t border-gray-100 transition-colors duration-300 group-hover:border-slate-800 gap-1 mt-auto">
          {/* Spec 1: Area */}
          <div className="text-center px-1">
            <div className="text-gray-500 transition-colors duration-300 group-hover:text-teal-400 mb-1 flex justify-center">
              <HiArrowsPointingOut className="h-4 w-4 text-teal-600 group-hover:text-teal-400" />
            </div>
            <div className="font-bold text-[0.875rem] text-gray-900 transition-colors duration-300 group-hover:text-white truncate">
              {formattedArea}
            </div>
            <div className="text-[0.625rem] text-gray-400 transition-colors duration-300 group-hover:text-slate-400 uppercase font-bold tracking-wider">
              Total Area
            </div>
          </div>

          {/* Spec 2: Class (with thin dividers) */}
          <div className="text-center px-1 border-l border-r border-gray-100 transition-colors duration-300 group-hover:border-slate-800">
            <div className="text-gray-500 transition-colors duration-300 group-hover:text-teal-400 mb-1 flex justify-center">
              <HiOutlineHome className="h-4 w-4 text-teal-600 group-hover:text-teal-400" />
            </div>
            <div className="font-bold text-[0.875rem] text-gray-900 transition-colors duration-300 group-hover:text-white truncate">
              {buildingClass}
            </div>
            <div className="text-[0.625rem] text-gray-400 transition-colors duration-300 group-hover:text-slate-400 uppercase font-bold tracking-wider">
              Rating
            </div>
          </div>

          {/* Spec 3: Floors / Capacity */}
          <div className="text-center px-1">
            <div className="text-gray-500 transition-colors duration-300 group-hover:text-teal-400 mb-1 flex justify-center">
              <HiShieldCheck className="h-4 w-4 text-teal-600 group-hover:text-teal-400" />
            </div>
            <div className="font-bold text-[0.875rem] text-gray-900 transition-colors duration-300 group-hover:text-white truncate">
              {floors}
            </div>
            <div className="text-[0.625rem] text-gray-400 transition-colors duration-300 group-hover:text-slate-400 uppercase font-bold tracking-wider">
              Floors
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            to={`/property/${id}`}
            className="btn btn-primary w-full p-2.5 rounded-xl font-bold text-[0.9375rem] text-center shadow-sm group-hover:bg-teal-500 group-hover:shadow-teal-500/25 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
