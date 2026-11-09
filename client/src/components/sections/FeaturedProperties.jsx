import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyGrid from '../property/PropertyGrid'
import { ArrowRight, Sparkles, Clock } from 'lucide-react'

export default function FeaturedProperties({
  featuredListings = [],
  recentListings = [],
  onWishlistToggle,
  wishlistIds = [],
}) {
  const [activeTab, setActiveTab] = useState('featured')

  const displayedProperties =
    activeTab === 'featured'
      ? featuredListings.length ? featuredListings : recentListings
      : recentListings.length ? recentListings : featuredListings

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#2F6BFF]">
            Handpicked Institutional Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E1E1C] tracking-tight mt-1">
            Featured Commercial Assets
          </h2>
          <p className="text-sm text-[#1E1E1C]/70 mt-1 font-medium">
            Click any property to inspect AI valuations, engineering blueprints, and direct broker contacts.
          </p>
        </div>

        {/* Tab switchers in Sand on Sand */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#EDE4D4] border border-[#C8BAA0]">
          <button
            type="button"
            onClick={() => setActiveTab('featured')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'featured'
                ? 'bg-[#1E1E1C] text-[#D8CBB3] shadow-sm'
                : 'text-[#1E1E1C]/70 hover:text-[#1E1E1C]'
            }`}
          >
            <Sparkles size={14} className={activeTab === 'featured' ? 'text-[#2F6BFF]' : ''} />
            <span>Featured Spaces</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recent')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'recent'
                ? 'bg-[#1E1E1C] text-[#D8CBB3] shadow-sm'
                : 'text-[#1E1E1C]/70 hover:text-[#1E1E1C]'
            }`}
          >
            <Clock size={14} className={activeTab === 'recent' ? 'text-[#2F6BFF]' : ''} />
            <span>Recently Added</span>
          </button>
        </div>
      </div>

      {/* Property Grid with Interactive Popup Modal */}
      <PropertyGrid
        properties={displayedProperties.slice(0, 6)}
        viewMode="grid"
        onWishlistToggle={onWishlistToggle}
        wishlistIds={wishlistIds}
      />

      {/* Bottom CTA to Search */}
      <div className="mt-10 text-center">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#1E1E1C] hover:bg-[#2F6BFF] text-[#D8CBB3] hover:text-white transition-all duration-300 shadow-md hover:shadow-[#2F6BFF]/25 hover:-translate-y-0.5"
        >
          <span>Explore Complete Commercial Catalog</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
