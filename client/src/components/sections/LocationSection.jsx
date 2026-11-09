import { Link } from 'react-router-dom'
import { MapPin, ArrowUpRight } from 'lucide-react'

const INDIAN_HUBS = [
  {
    city: 'Gurgaon',
    state: 'Haryana / NCR',
    corridor: 'CyberCity & Golf Course Ext.',
    count: '160+ Spaces',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    type: 'IT, BFSI & Tech Campuses',
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    corridor: 'Outer Ring Road & Whitefield',
    count: '240+ Spaces',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    type: 'Global Capability Centers (GCC)',
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    corridor: 'Bandra Kurla Complex (BKC)',
    count: '190+ Spaces',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    type: 'Prime Financial & Legal HQs',
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    corridor: 'HITEC City & Financial District',
    count: '145+ Spaces',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
    type: 'Biotech & Enterprise Tech Hub',
  },
  {
    city: 'Mohali',
    state: 'Punjab',
    corridor: 'IT City & Airport Industrial Zone',
    count: '75+ Spaces',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    type: 'Industrial Logistics & Tech Parks',
  },
  {
    city: 'Noida',
    state: 'Uttar Pradesh / NCR',
    corridor: 'Noida-Greater Noida Expressway',
    count: '110+ Spaces',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80',
    type: 'Data Centers & Logistics Clusters',
  },
]

export default function LocationSection() {
  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#2F6BFF]">
            Key Economic Corridors
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1E1C] tracking-tight mt-1">
            Featured Indian Commercial Hubs
          </h2>
          <p className="text-sm text-[#1E1E1C]/70 mt-1 font-medium">
            High-absorption micro-markets across Tier-1 and emerging business corridors.
          </p>
        </div>

        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#2F6BFF] hover:text-[#1E55E6] transition-colors"
        >
          <span>All Regional Markets</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDIAN_HUBS.map((hub) => (
          <Link
            key={hub.city}
            to={`/search?city=${hub.city}`}
            className="group relative rounded-3xl overflow-hidden h-64 border border-[#383833] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end p-6 select-none bg-[#1E1E1C]"
          >
            {/* Background Photography with Charcoal Overlay */}
            <img
              src={hub.image}
              alt={`${hub.city} Commercial Real Estate`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-40"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1C] via-[#1E1E1C]/65 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#282825] text-[#D8CBB3] border border-[#383833]">
                {hub.count}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 text-white">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F6BFF] mb-1">
                <MapPin size={13} />
                <span>{hub.state}</span>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-[#2F6BFF] transition-colors">
                {hub.city}
              </h3>
              <p className="text-xs text-[#D8CBB3]/80 font-medium mt-0.5">{hub.corridor}</p>
              <div className="mt-3 pt-3 border-t border-[#383833] flex items-center justify-between text-[11px] text-[#D8CBB3]/70">
                <span>{hub.type}</span>
                <span className="font-bold text-white group-hover:text-[#2F6BFF] flex items-center gap-1">
                  Explore <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
