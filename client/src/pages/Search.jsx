import { useState, useMemo } from 'react'
import {
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineSparkles,
  HiX,
} from 'react-icons/hi'
import FilterPanel from '../components/filters/FilterPanel'
import PropertyCard from '../components/property/PropertyCard'
import Pagination from '../components/common/Pagination'
import mockProperties from '../data/mockProperties'

const ITEMS_PER_PAGE = 6

const Search = () => {
  const [filters, setFilters] = useState({
    propertyTypes: [],
    listingType: '',
    maxPrice: 4000000,
    maxArea: 40000,
    city: 'All',
    buildingClass: 'All',
    searchQuery: '',
    sort: 'newest',
  })

  const [page, setPage] = useState(1)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Reset all filters to default
  const handleResetFilters = () => {
    setFilters({
      propertyTypes: [],
      listingType: '',
      maxPrice: 4000000,
      maxArea: 40000,
      city: 'All',
      buildingClass: 'All',
      searchQuery: '',
      sort: 'newest',
    })
    setPage(1)
  }

  // Remove single filter chip
  const removeFilterChip = (type, value) => {
    setFilters((prev) => {
      if (type === 'propertyType') {
        return {
          ...prev,
          propertyTypes: prev.propertyTypes.filter((t) => t !== value),
        }
      }
      if (type === 'listingType') return { ...prev, listingType: '' }
      if (type === 'city') return { ...prev, city: 'All' }
      if (type === 'buildingClass') return { ...prev, buildingClass: 'All' }
      return prev
    })
    setPage(1)
  }

  // Filter and sort mock properties
  const filteredProperties = useMemo(() => {
    return mockProperties
      .filter((item) => {
        // Property type match
        const itemType = (item.propertyType || '').toLowerCase()
        if (
          filters.propertyTypes.length > 0 &&
          !filters.propertyTypes.some((t) => t.toLowerCase() === itemType)
        ) {
          return false
        }

        // Listing type match
        const itemListing = (item.listingType || 'sale').toLowerCase()
        if (
          filters.listingType &&
          itemListing !== filters.listingType.toLowerCase()
        ) {
          return false
        }

        // Price match
        if (item.price > filters.maxPrice) {
          return false
        }

        // Area match
        const areaVal = item.area?.totalSqFt || item.area || 0
        if (areaVal > filters.maxArea) {
          return false
        }

        // City match
        const itemCity = item.location?.city || item.city || ''
        if (
          filters.city !== 'All' &&
          itemCity.toLowerCase() !== filters.city.toLowerCase()
        ) {
          return false
        }

        // Building Class match
        const itemClass =
          item.structural?.buildingClass || item.buildingClass || ''
        if (
          filters.buildingClass !== 'All' &&
          itemClass.toLowerCase() !== filters.buildingClass.toLowerCase()
        ) {
          return false
        }

        // Text query search
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase()
          const inTitle = item.title?.toLowerCase().includes(q)
          const inDesc = item.description?.toLowerCase().includes(q)
          const inCity = itemCity.toLowerCase().includes(q)
          if (!inTitle && !inDesc && !inCity) return false
        }

        return true
      })
      .sort((a, b) => {
        if (filters.sort === 'priceLow') return a.price - b.price
        if (filters.sort === 'priceHigh') return b.price - a.price
        if (filters.sort === 'areaHigh') {
          const areaA = a.area?.totalSqFt || a.area || 0
          const areaB = b.area?.totalSqFt || b.area || 0
          return areaB - areaA
        }
        // newest
        return (b.id || 0) - (a.id || 0)
      })
  }, [filters])

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE) || 1
  const pagedProperties = filteredProperties.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const activeFiltersCount =
    (filters.propertyTypes?.length || 0) +
    (filters.listingType ? 1 : 0) +
    (filters.city !== 'All' ? 1 : 0) +
    (filters.buildingClass !== 'All' ? 1 : 0)

  return (
    <div className="space-y-8 pb-12">
      {/* High-Contrast Premium Search Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        {/* Subtle decorative background shapes */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 border border-teal-500/30 backdrop-blur-md mb-4">
            <HiOutlineSparkles className="h-4 w-4 text-teal-400" />
            <span>Commercial Market Explorer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Commercial Real Estate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              Listings & Analytics
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Explore active office, retail, warehouse, and industrial assets with AI-driven valuation estimates, building class ratings, and full structural specs.
          </p>

          {/* Quick Keyword Search Input inside Hero */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                  setPage(1)
                }}
                placeholder="Search by name, district, or keyword…"
                className="w-full rounded-xl bg-white/10 border border-white/20 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white/15 backdrop-blur-md transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Sticky Filter Panel + Results Grid) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Filter Panel (Desktop Sticky + Mobile Drawer) */}
        <FilterPanel
          filters={filters}
          setFilters={(val) => {
            setFilters(val)
            setPage(1)
          }}
          onReset={handleResetFilters}
          totalResults={filteredProperties.length}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Results Column */}
        <div className="flex-1 w-full min-w-0">
          {/* Results Bar with Sort & Mobile Filter Toggle */}
          <div className="mb-6 rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-gray-200/90 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-extrabold text-gray-900">
                  Showing {filteredProperties.length} Properties
                </span>
                {filters.listingType && (
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    For {filters.listingType === 'lease' ? 'Lease' : 'Sale'}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Targeted commercial opportunities matching your criteria
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden btn btn-outline py-2 px-3 text-xs font-bold flex items-center gap-1.5 rounded-xl border-gray-300"
              >
                <HiOutlineFilter className="h-4 w-4 text-teal-600" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="h-5 w-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={filters.sort}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, sort: e.target.value }))
                    setPage(1)
                  }}
                  className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-800 shadow-2xs outline-none focus:border-teal-600 cursor-pointer"
                >
                  <option value="newest">Newest Listed</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="areaHigh">Area: Largest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
                Active:
              </span>

              {filters.listingType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                  <span>Type: {filters.listingType}</span>
                  <button
                    type="button"
                    onClick={() => removeFilterChip('listingType')}
                    className="text-gray-400 hover:text-gray-700 ml-1"
                  >
                    <HiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              {filters.propertyTypes?.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200"
                >
                  <span className="capitalize">{t}</span>
                  <button
                    type="button"
                    onClick={() => removeFilterChip('propertyType', t)}
                    className="text-teal-600 hover:text-teal-900 ml-1"
                  >
                    <HiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}

              {filters.city !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                  <span>City: {filters.city}</span>
                  <button
                    type="button"
                    onClick={() => removeFilterChip('city')}
                    className="text-gray-400 hover:text-gray-700 ml-1"
                  >
                    <HiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              {filters.buildingClass !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                  <span>{filters.buildingClass}</span>
                  <button
                    type="button"
                    onClick={() => removeFilterChip('buildingClass')}
                    className="text-gray-400 hover:text-gray-700 ml-1"
                  >
                    <HiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pagedProperties.map((property) => (
                <PropertyCard key={property._id || property.id} property={property} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xs">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-4 border border-teal-100">
                <HiOutlineSearch className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                No matching commercial properties
              </h3>
              <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                We couldn't find any listings matching your current filter selections. Try adjusting the price range, area limits, or property types.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-primary py-2.5 px-6 rounded-xl font-bold text-sm shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  setPage(newPage)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
