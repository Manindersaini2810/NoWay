import { HiOutlineFilter, HiX, HiOutlineRefresh } from 'react-icons/hi'

const FilterPanel = ({
  filters,
  setFilters,
  onReset,
  totalResults = 0,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const propertyTypeOptions = [
    { label: 'Office', value: 'office' },
    { label: 'Retail', value: 'retail' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Industrial', value: 'industrial' },
    { label: 'Land', value: 'land' },
    { label: 'Mixed-use', value: 'mixed-use' },
  ]

  const buildingClassOptions = ['All', 'Class A', 'Class B', 'Class C']

  const cityOptions = [
    'All',
    'Seattle',
    'Austin',
    'Denver',
    'Phoenix',
    'Chicago',
    'Miami',
    'Atlanta',
    'Dallas',
    'New York',
    'San Francisco',
  ]

  const handleTypeToggle = (typeValue) => {
    const currentTypes = filters.propertyTypes || []
    const updated = currentTypes.includes(typeValue)
      ? currentTypes.filter((t) => t !== typeValue)
      : [...currentTypes, typeValue]

    setFilters((prev) => ({
      ...prev,
      propertyTypes: updated,
    }))
  }

  const handleListingTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      listingType: prev.listingType === type ? '' : type,
    }))
  }

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <HiOutlineFilter className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 leading-none">
              Filter Listings
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Refine commercial spaces
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-teal-50 transition-colors"
          title="Reset all filters"
        >
          <HiOutlineRefresh className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Listing Type Toggle (Sale vs Lease) */}
      <div>
        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
          Transaction Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100/80 rounded-xl border border-gray-200">
          {[
            { label: 'All', value: '' },
            { label: 'For Sale', value: 'sale' },
            { label: 'For Lease', value: 'lease' },
          ].map((item) => {
            const isSelected =
              (!filters.listingType && item.value === '') ||
              filters.listingType === item.value

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleListingTypeChange(item.value)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Property Type Pills */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
            Property Category
          </label>
          {filters.propertyTypes?.length > 0 && (
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              {filters.propertyTypes.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {propertyTypeOptions.map((opt) => {
            const isSelected = filters.propertyTypes?.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleTypeToggle(opt.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-sm border border-teal-600'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50/30'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Max Price
          </label>
          <span className="text-xs font-bold text-teal-700 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
            ${(filters.maxPrice || 3500000).toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="100000"
          max="5000000"
          step="50000"
          value={filters.maxPrice || 3500000}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
          className="w-full accent-teal-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-semibold">
          <span>$100k</span>
          <span>$2.5M</span>
          <span>$5M+</span>
        </div>
      </div>

      {/* Area Range Slider */}
      <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Max Area (Sq Ft)
          </label>
          <span className="text-xs font-bold text-teal-700 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
            {(filters.maxArea || 40000).toLocaleString()} sq ft
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="60000"
          step="1000"
          value={filters.maxArea || 40000}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxArea: Number(e.target.value),
            }))
          }
          className="w-full accent-teal-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-semibold">
          <span>1,000 sq ft</span>
          <span>30,000</span>
          <span>60,000+</span>
        </div>
      </div>

      {/* City Dropdown */}
      <div>
        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
          City Location
        </label>
        <select
          value={filters.city || 'All'}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-2xs outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          {cityOptions.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Metropolitan Areas' : c}
            </option>
          ))}
        </select>
      </div>

      {/* Building Class */}
      <div>
        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
          Building Class
        </label>
        <select
          value={filters.buildingClass || 'All'}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              buildingClass: e.target.value,
            }))
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-2xs outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          {buildingClassOptions.map((cls) => (
            <option key={cls} value={cls}>
              {cls === 'All' ? 'All Building Classes' : cls}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        className="w-full btn btn-outline py-2.5 text-xs font-bold rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop Sticky Panel */}
      <aside className="hidden lg:block w-[300px] shrink-0">
        <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-md border border-gray-200">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer (Slide-up or Slide-in) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Card */}
          <div className="relative mt-auto w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl border-t border-gray-200 z-10 transition-transform">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <span className="text-sm font-bold text-gray-900">
                Filters ({totalResults} properties found)
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
            {content}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onCloseMobile}
                className="btn btn-primary w-full py-3 rounded-xl font-bold text-sm shadow-md"
              >
                Show {totalResults} Properties
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterPanel
