import PropertyCard from './PropertyCard'

export default function SimilarProperties({ properties = [], onPropertyClick, onWishlistToggle, wishlistIds = [] }) {
  if (!properties || properties.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-[#12151a]">Similar Commercial Assets</h3>
          <p className="text-xs text-[#536072] mt-0.5">
            Comparable spaces in category, zoning or institutional grade
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => {
          const propId = property._id || property.id
          const isWishlisted = wishlistIds.includes(propId)

          return (
            <PropertyCard
              key={propId || index}
              property={property}
              index={index}
              onClick={onPropertyClick}
              onWishlistToggle={onWishlistToggle}
              isWishlisted={isWishlisted}
            />
          )
        })}
      </div>
    </div>
  )
}
