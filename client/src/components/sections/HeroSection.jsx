import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Building2 } from 'lucide-react'

const LOCATIONS = [
  'All Locations',
  'Gurgaon',
  'Bengaluru',
  'Mumbai',
  'Hyderabad',
  'Mohali',
  'Chandigarh',
  'Noida',
  'Pune',
  'Seattle',
  'Austin',
]

const PROPERTY_TYPES = [
  { id: 'all', label: 'All Categories' },
  { id: 'office', label: 'Office' },
  { id: 'retail', label: 'Retail' },
  { id: 'warehouse', label: 'Warehouse' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'land', label: 'Land' },
]

export default function HeroSection() {
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedType, setSelectedType] = useState('all')
  const [listingType, setListingType] = useState('all')
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedLocation !== 'All Locations') params.append('city', selectedLocation)
    if (selectedType !== 'all') params.append('type', selectedType)
    if (listingType !== 'all') params.append('listingType', listingType)
    if (keyword.trim()) params.append('query', keyword.trim())

    navigate(`/search?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-[#1E1E1C] text-[#D8CBB3] shadow-2xl my-4 border border-[#383833]">
      {/* Background Architectural Photography with Charcoal Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
          alt="Modern commercial architectural building"
          className="w-full h-full object-cover opacity-25 scale-102 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E1C] via-[#1E1E1C]/92 to-[#1E1E1C]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1C] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#282825] border border-[#383833] text-xs font-bold text-[#D8CBB3] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#2F6BFF]" />
          <span className="text-[#2F6BFF] font-extrabold uppercase tracking-wider">NoWay Commercial</span>
          <span className="text-[#D8CBB3]/40">|</span>
          <span>Next-Gen Property Intelligence</span>
        </div>

        {/* Master Sand-colored Headline with Electric Blue Highlight */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#D8CBB3] max-w-4xl leading-[1.12]">
          Find the Right Space. <br />
          <span className="text-[#2F6BFF]">
            Build What&apos;s Next.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#D8CBB3]/80 font-normal leading-relaxed">
          The premier institutional marketplace for commercial offices, warehouses, retail spaces,
          and prime land across India and global business corridors. Powered by real-time ML valuations.
        </p>

        {/* Commercial Search Engine Container */}
        <div className="mt-10 p-4 sm:p-5 rounded-3xl bg-[#282825] border border-[#383833] shadow-2xl max-w-4xl">
          {/* Transaction Type Selector Tabs */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#383833]">
            {[
              { id: 'all', label: 'All Transactions' },
              { id: 'sale', label: 'For Sale' },
              { id: 'lease', label: 'For Lease' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setListingType(tab.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  listingType === tab.id
                    ? 'bg-[#2F6BFF] text-white shadow-md'
                    : 'bg-transparent text-[#D8CBB3]/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Location Selector */}
            <div className="sm:col-span-4 relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#D8CBB3]/70 block mb-1">
                Location / Corridor
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2F6BFF]" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1E1E1C] text-[#D8CBB3] border border-[#383833] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#2F6BFF]"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#1E1E1C] text-[#D8CBB3]">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Type Selector */}
            <div className="sm:col-span-3 relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#D8CBB3]/70 block mb-1">
                Property Category
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2F6BFF]" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1E1E1C] text-[#D8CBB3] border border-[#383833] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#2F6BFF]"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type.id} value={type.id} className="bg-[#1E1E1C] text-[#D8CBB3]">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyword / Specs Input */}
            <div className="sm:col-span-3 relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#D8CBB3]/70 block mb-1">
                Keyword or Landmark
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. CyberCity, 20,000 sq ft..."
                className="w-full px-3.5 py-3 bg-[#1E1E1C] text-[#D8CBB3] border border-[#383833] rounded-xl text-xs font-medium placeholder-[#D8CBB3]/40 focus:outline-none focus:border-[#2F6BFF]"
              />
            </div>

            {/* Search Submit Button: Electric Blue */}
            <div className="sm:col-span-2 pt-4 sm:pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-[#2F6BFF]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search size={15} />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Proof Points */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#383833]">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#D8CBB3]">₹4,800+ Cr</div>
            <div className="text-xs text-[#D8CBB3]/60 font-medium mt-0.5">Asset Volume Listed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#2F6BFF]">1,250+</div>
            <div className="text-xs text-[#D8CBB3]/60 font-medium mt-0.5">Verified Commercial Spaces</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#D8CBB3]">10 Hubs</div>
            <div className="text-xs text-[#D8CBB3]/60 font-medium mt-0.5">Indian & Global Tech Corridors</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#2F6BFF]">99.4%</div>
            <div className="text-xs text-[#D8CBB3]/60 font-medium mt-0.5">ML Valuation Precision</div>
          </div>
        </div>
      </div>
    </section>
  )
}
