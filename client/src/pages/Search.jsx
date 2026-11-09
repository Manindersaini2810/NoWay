import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search as SearchIcon,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import FilterPanel from '../components/filters/FilterPanel'
import MobileFilterDrawer from '../components/filters/MobileFilterDrawer'
import PropertyGrid from '../components/property/PropertyGrid'
import propertyApi from '../services/propertyApi'
import userApi from '../services/userApi'

const ITEMS_PER_PAGE = 6

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => ({
    propertyTypes: searchParams.get('type') ? [searchParams.get('type')] : [],
    listingType: searchParams.get('listingType') || '',
    city: searchParams.get('city') || 'All',
    buildingClass: 'All',
    searchQuery: searchParams.get('query') || '',
    maxPrice: 10000000,
    sort: 'newest',
  }))

  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [properties, setProperties] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [wishlistIds, setWishlistIds] = useState([])

  // Synchronize initial URL search query changes safely
  useEffect(() => {
    let ignore = false
    const city = searchParams.get('city')
    const type = searchParams.get('type')
    const listingType = searchParams.get('listingType')
    const query = searchParams.get('query')

    if (city || type || listingType || query) {
      Promise.resolve().then(() => {
        if (!ignore) {
          setFilters((prev) => ({
            ...prev,
            city: city || prev.city,
            propertyTypes: type ? [type] : prev.propertyTypes,
            listingType: listingType !== null ? listingType : prev.listingType,
            searchQuery: query !== null ? query : prev.searchQuery,
          }))
        }
      })
    }

    return () => {
      ignore = true
    }
  }, [searchParams])

  // Fetch properties whenever filters or page change
  useEffect(() => {
    let ignore = false

    const params = {
      page,
      limit: ITEMS_PER_PAGE,
      sort: filters.sort,
      search: filters.searchQuery || undefined,
      city: filters.city !== 'All' ? filters.city : undefined,
      propertyType: filters.propertyTypes.length ? filters.propertyTypes : undefined,
      listingType: filters.listingType || undefined,
      buildingClass: filters.buildingClass !== 'All' ? filters.buildingClass : undefined,
      maxPrice: filters.maxPrice < 10000000 ? filters.maxPrice : undefined,
    }

    propertyApi
      .getProperties(params)
      .then((res) => {
        if (!ignore) {
          setProperties(res.items || [])
          setTotalResults(res.total || 0)
          setTotalPages(res.totalPages || 1)
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error('Search query error:', err)
          setProperties([])
          setTotalResults(0)
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [filters, page])

  // Load user favorites
  useEffect(() => {
    let ignore = false
    userApi
      .getFavorites()
      .then((data) => {
        if (!ignore) {
          setWishlistIds(Array.isArray(data) ? data.map((f) => f._id || f.id || f) : [])
        }
      })
      .catch(() => {})

    return () => {
      ignore = true
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

  const handleResetFilters = () => {
    setFilters({
      propertyTypes: [],
      listingType: '',
      city: 'All',
      buildingClass: 'All',
      searchQuery: '',
      maxPrice: 10000000,
      sort: 'newest',
    })
    setPage(1)
    setSearchParams({})
  }

  const removeFilterChip = (type, value) => {
    setFilters((prev) => {
      if (type === 'propertyType') {
        return { ...prev, propertyTypes: prev.propertyTypes.filter((t) => t !== value) }
      }
      if (type === 'listingType') return { ...prev, listingType: '' }
      if (type === 'city') return { ...prev, city: 'All' }
      if (type === 'buildingClass') return { ...prev, buildingClass: 'All' }
      if (type === 'searchQuery') return { ...prev, searchQuery: '' }
      return prev
    })
    setPage(1)
  }

  const activeChips = [
    ...(filters.propertyTypes || []).map((t) => ({ type: 'propertyType', label: t, value: t })),
    ...(filters.listingType
      ? [{ type: 'listingType', label: `For ${filters.listingType}`, value: filters.listingType }]
      : []),
    ...(filters.city && filters.city !== 'All'
      ? [{ type: 'city', label: filters.city, value: filters.city }]
      : []),
    ...(filters.buildingClass && filters.buildingClass !== 'All'
      ? [{ type: 'buildingClass', label: filters.buildingClass, value: filters.buildingClass }]
      : []),
    ...(filters.searchQuery
      ? [{ type: 'searchQuery', label: `"${filters.searchQuery}"`, value: filters.searchQuery }]
      : []),
  ]

  return (
    <div className="space-y-6 text-[#1E1E1C]">
      {/* Top Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search input with Electric Blue focus */}
        <div className="relative flex-1">
          <SearchIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2F6BFF]"
          />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              setPage(1)
            }}
            placeholder="Search by building name, corridor, city, or specifications..."
            className="w-full pl-11 pr-4 py-3 bg-[#D8CBB3] border border-[#C8BAA0] rounded-2xl text-xs font-bold text-[#1E1E1C] placeholder-[#1E1E1C]/50 focus:outline-none focus:border-[#2F6BFF]"
          />
        </div>

        {/* View mode and Mobile Drawer trigger */}
        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D8CBB3] border border-[#C8BAA0] text-xs font-black text-[#1E1E1C]"
          >
            <SlidersHorizontal size={14} className="text-[#2F6BFF]" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <select
            value={filters.sort}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
              setPage(1)
            }}
            className="px-3.5 py-2.5 bg-[#D8CBB3] border border-[#C8BAA0] rounded-xl text-xs font-black text-[#1E1E1C] focus:outline-none focus:border-[#2F6BFF]"
          >
            <option value="newest">Sort: Highest Activity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area-desc">Area: Largest Space</option>
          </select>

          {/* Grid / List View Toggle */}
          <div className="flex items-center p-1 bg-[#D8CBB3] rounded-xl border border-[#C8BAA0]">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#1E1E1C] text-[#D8CBB3] shadow-xs'
                  : 'text-[#1E1E1C]/60 hover:text-[#1E1E1C]'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-[#1E1E1C] text-[#D8CBB3] shadow-xs'
                  : 'text-[#1E1E1C]/60 hover:text-[#1E1E1C]'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips with Electric Blue highlights */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#1E1E1C]">
            Active Filters:
          </span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#EDE4D4] border border-[#2F6BFF] text-[#1E1E1C]"
            >
              <span className="capitalize">{chip.label}</span>
              <button
                type="button"
                onClick={() => removeFilterChip(chip.type, chip.value)}
                className="hover:text-[#2F6BFF] transition-colors"
              >
                <X size={13} />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-black text-[#2F6BFF] hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid with Sidebar Filter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar in Charcoal (4 cols) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-20">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetFilters}
            totalResults={totalResults}
          />
        </aside>

        {/* Results Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-black text-[#1E1E1C]">
            <span>
              Showing {properties.length} of {totalResults} available commercial listings
            </span>
          </div>

          {loading ? (
            <div className="p-16 text-center rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm">
              <Loader2 size={32} className="animate-spin text-[#2F6BFF] mx-auto mb-3" />
              <p className="text-sm font-black text-[#1E1E1C]">
                Querying verified commercial assets...
              </p>
            </div>
          ) : (
            <PropertyGrid
              properties={properties}
              viewMode={viewMode}
              onWishlistToggle={handleWishlistToggle}
              wishlistIds={wishlistIds}
            />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2.5 rounded-xl border border-[#C8BAA0] bg-[#EDE4D4] text-[#1E1E1C] disabled:opacity-40 hover:bg-[#D8CBB3] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                    page === p
                      ? 'bg-[#2F6BFF] text-white shadow-md'
                      : 'border border-[#C8BAA0] bg-[#EDE4D4] text-[#1E1E1C] hover:bg-[#D8CBB3]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-2.5 rounded-xl border border-[#C8BAA0] bg-[#EDE4D4] text-[#1E1E1C] disabled:opacity-40 hover:bg-[#D8CBB3] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-in Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        totalResults={totalResults}
      />
    </div>
  )
}
