import { useState } from 'react'
import PropertyCard from './PropertyCard'
import PropertyModal from './PropertyModal'
import { SearchX } from 'lucide-react'

export default function PropertyGrid({
  properties = [],
  viewMode = 'grid',
  onWishlistToggle,
  wishlistIds = [],
  emptyMessage = 'No commercial properties found matching your criteria.',
}) {
  const [selectedProperty, setSelectedProperty] = useState(null)

  const handleCardClick = (property) => {
    setSelectedProperty(property)
  }

  const handleCloseModal = () => {
    setSelectedProperty(null)
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-[#EDE4D4] border border-[#1E1E1C]/15 shadow-sm my-6">
        <div className="w-16 h-16 rounded-2xl bg-[#1E1E1C] text-[#2F6BFF] flex items-center justify-center mx-auto mb-4 border border-[#2F6BFF]/30">
          <SearchX size={32} />
        </div>
        <h3 className="text-lg font-extrabold text-[#1E1E1C]">No Listings Found</h3>
        <p className="text-sm text-[#1E1E1C]/70 max-w-md mx-auto mt-1">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <>
      <div
        className={
          viewMode === 'list'
            ? 'flex flex-col gap-4'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        }
      >
        {properties.map((property, index) => {
          const propId = property._id || property.id
          const isWishlisted = wishlistIds.includes(propId)

          return (
            <PropertyCard
              key={propId || index}
              property={property}
              index={index}
              onClick={handleCardClick}
              onWishlistToggle={onWishlistToggle}
              isWishlisted={isWishlisted}
            />
          )
        })}
      </div>

      {/* 360Ghar-inspired Property Popup Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={handleCloseModal}
          onFavoriteToggle={onWishlistToggle}
          isFavorited={wishlistIds.includes(selectedProperty._id || selectedProperty.id)}
        />
      )}
    </>
  )
}
