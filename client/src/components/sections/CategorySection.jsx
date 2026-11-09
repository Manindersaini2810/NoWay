import { Link } from 'react-router-dom'
import { Building2, ShoppingBag, Warehouse, Factory, Map, Building, ArrowUpRight } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'office',
    title: 'Grade-A Office Towers',
    description: 'Corporate headquarters, IT campuses, and plug-and-play flexible office floors.',
    icon: Building2,
    count: '340+ Assets',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'retail',
    title: 'Retail & Commercial Malls',
    description: 'High-street storefronts, dining promenades, and anchored retail centers.',
    icon: ShoppingBag,
    count: '185+ Assets',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'warehouse',
    title: 'Logistics & Warehouses',
    description: 'High-clearance fulfillment centers, multi-dock storage, and cold chains.',
    icon: Warehouse,
    count: '210+ Assets',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'industrial',
    title: 'Industrial & Manufacturing',
    description: 'Heavy power capacity, manufacturing plants, and specialized flex parks.',
    icon: Factory,
    count: '140+ Assets',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'land',
    title: 'Commercial Land & Plots',
    description: 'Institutional land parcels, industrial corridors, and greenfield developments.',
    icon: Map,
    count: '95+ Parcels',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mixed-use',
    title: 'Integrated Mixed-Use',
    description: 'Blended commercial, hotel, and premium experiential developments.',
    icon: Building,
    count: '80+ Assets',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
  },
]

export default function CategorySection() {
  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#2F6BFF]">
            Commercial Typologies
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1E1C] tracking-tight mt-1">
            Explore Assets by Category
          </h2>
          <p className="text-sm text-[#1E1E1C]/70 mt-1 max-w-xl font-medium">
            Tailored engineering specifications and zoning clearances structured for institutional tenants and developers.
          </p>
        </div>

        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#2F6BFF] hover:text-[#1E55E6] transition-colors"
        >
          <span>View All 1,250+ Listings</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.id}
              to={`/search?type=${cat.id}`}
              className="group relative rounded-3xl overflow-hidden bg-[#EDE4D4] border border-[#C8BAA0] hover:border-[#1E1E1C] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[220px]"
            >
              {/* Subtle background photo */}
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none overflow-hidden rounded-br-3xl">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D8CBB3] group-hover:bg-[#2F6BFF] text-[#1E1E1C] group-hover:text-white border border-[#C8BAA0] flex items-center justify-center transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-black text-[#1E1E1C]/80 uppercase tracking-wider bg-[#D8CBB3] px-2.5 py-1 rounded-full border border-[#C8BAA0]">
                    {cat.count}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#1E1E1C] group-hover:text-[#2F6BFF] transition-colors duration-200">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#1E1E1C]/70 mt-1.5 leading-relaxed font-medium">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-1 text-xs font-black text-[#1E1E1C] group-hover:text-[#2F6BFF] transition-colors">
                <span>Browse Inventory</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
