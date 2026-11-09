import { Filter, RotateCcw, Check, MapPin } from 'lucide-react'
import {
  PROPERTY_TYPE_OPTIONS,
  BUILDING_CLASS_OPTIONS,
  CITY_OPTIONS,
} from '../../data/filterConstants'

export default function FilterPanel({
  filters,
  setFilters,
  onReset,
  totalResults = 0,
}) {
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

  return (
    <div className="p-6 rounded-3xl bg-[#1E1E1C] border border-[#383833] shadow-xl space-y-6 text-[#D8CBB3]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#383833]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-[#282825] text-[#2F6BFF] flex items-center justify-center border border-[#383833]">
            <Filter size={16} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white leading-tight">
              Filters
            </h2>
            <p className="text-[11px] text-[#D8CBB3]/70 font-semibold">
              {totalResults} assets matching
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs font-black text-[#2F6BFF] hover:text-[#1E55E6] flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Transaction Type (All / Sale / Lease) */}
      <div>
        <label className="block text-xs font-black text-[#D8CBB3] uppercase tracking-wider mb-2">
          Transaction Mode
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#282825] rounded-xl border border-[#383833]">
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
                className={`py-2 px-1 text-xs font-black rounded-lg transition-all ${
                  isSelected
                    ? 'bg-[#2F6BFF] text-white shadow-xs'
                    : 'text-[#D8CBB3]/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Property Category Multiselect */}
      <div>
        <label className="block text-xs font-black text-[#D8CBB3] uppercase tracking-wider mb-2">
          Property Type
        </label>
        <div className="space-y-1.5">
          {PROPERTY_TYPE_OPTIONS.map((item) => {
            const isChecked = (filters.propertyTypes || []).includes(item.value)

            return (
              <label
                key={item.value}
                onClick={() => handleTypeToggle(item.value)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border text-xs font-black transition-all ${
                  isChecked
                    ? 'bg-[#282825] border-[#2F6BFF] text-white'
                    : 'border-[#383833] text-[#D8CBB3]/80 hover:bg-[#282825] hover:text-white'
                }`}
              >
                <span className="capitalize">{item.label}</span>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-[#2F6BFF] border-[#2F6BFF] text-white'
                      : 'border-[#383833] bg-[#1E1E1C]'
                  }`}
                >
                  {isChecked && <Check size={11} strokeWidth={3} />}
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* Location / Corridor Selector */}
      <div>
        <label className="block text-xs font-black text-[#D8CBB3] uppercase tracking-wider mb-2">
          Location / Hub
        </label>
        <div className="relative">
          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2F6BFF]" />
          <select
            value={filters.city || 'All'}
            onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full pl-9 pr-3 py-2.5 bg-[#282825] border border-[#383833] rounded-xl text-xs font-bold text-[#D8CBB3] focus:outline-none focus:border-[#2F6BFF]"
          >
            {CITY_OPTIONS.map((c) => (
              <option key={c} value={c} className="bg-[#1E1E1C] text-[#D8CBB3]">
                {c === 'All' ? 'All Locations' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Building Class */}
      <div>
        <label className="block text-xs font-black text-[#D8CBB3] uppercase tracking-wider mb-2">
          Building Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#282825] rounded-xl border border-[#383833]">
          {BUILDING_CLASS_OPTIONS.map((cls) => {
            const isSelected = (filters.buildingClass || 'All') === cls
            return (
              <button
                key={cls}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, buildingClass: cls }))}
                className={`py-1.5 text-xs font-black rounded-lg transition-all ${
                  isSelected
                    ? 'bg-[#2F6BFF] text-white shadow-xs'
                    : 'text-[#D8CBB3]/70 hover:text-white'
                }`}
              >
                {cls.replace('Class ', '')}
              </button>
            )
          })}
        </div>
      </div>

      {/* Max Price Range with Electric Blue Accent */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-black text-[#D8CBB3] uppercase tracking-wider">
            Max Budget
          </label>
          <span className="text-xs font-black text-[#2F6BFF]">
            {filters.maxPrice >= 10000000
              ? 'Any Budget'
              : `$${(filters.maxPrice || 5000000).toLocaleString()}`}
          </span>
        </div>
        <input
          type="range"
          min="500000"
          max="10000000"
          step="250000"
          value={filters.maxPrice || 5000000}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full h-1.5 bg-[#383833] rounded-lg appearance-none cursor-pointer accent-[#2F6BFF]"
        />
        <div className="flex justify-between text-[10px] text-[#D8CBB3]/60 font-semibold mt-1">
          <span>$500K</span>
          <span>$10M+</span>
        </div>
      </div>
    </div>
  )
}
