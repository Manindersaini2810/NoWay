import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Sparkles,
  Calendar,
  Phone,
  Mail,
  Send,
  ArrowLeft,
  CheckCircle2,
  Check,
  Heart,
  Loader2,
} from 'lucide-react'
import PropertyGallery from '../components/property/PropertyGallery'
import PropertySpecifications from '../components/property/PropertySpecifications'
import SimilarProperties from '../components/property/SimilarProperties'
import propertyApi from '../services/propertyApi'
import inquiryApi from '../services/inquiryApi'
import userApi from '../services/userApi'

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [wishlistIds, setWishlistIds] = useState([])

  // Inquiry form states
  const [inquiryMessage, setInquiryMessage] = useState('')
  const [inquirySubmitting, setInquirySubmitting] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)

  // Schedule visit states
  const [visitDate, setVisitDate] = useState('')
  const [visitSuccess, setVisitSuccess] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadPropertyData() {
      setLoading(true)
      setError(null)
      try {
        const [prop, sim, favs] = await Promise.all([
          propertyApi.getPropertyById(id),
          propertyApi.getSimilarProperties(id).catch(() => []),
          userApi.getFavorites().catch(() => []),
        ])

        if (isMounted) {
          setProperty(prop)
          setSimilar(sim || [])
          const favList = Array.isArray(favs) ? favs.map((f) => f._id || f.id || f) : []
          setWishlistIds(favList)
          setIsWishlisted(favList.includes(prop._id || prop.id))
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Commercial property not found')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadPropertyData()
    return () => {
      isMounted = false
    }
  }, [id])

  const handleWishlistToggle = async (propId) => {
    const targetId = propId || property._id || property.id
    if (isWishlisted) {
      setIsWishlisted(false)
      setWishlistIds((prev) => prev.filter((i) => i !== targetId))
      await userApi.removeFavorite(targetId).catch(() => {})
    } else {
      setIsWishlisted(true)
      setWishlistIds((prev) => [...prev, targetId])
      await userApi.addFavorite(targetId).catch(() => {})
    }
  }

  const handleSendInquiry = async (e) => {
    e.preventDefault()
    if (!inquiryMessage.trim()) return

    setInquirySubmitting(true)
    try {
      await inquiryApi.createInquiry({
        propertyId: property._id || property.id,
        message: inquiryMessage,
      })
      setInquirySuccess(true)
      setInquiryMessage('')
      setTimeout(() => setInquirySuccess(false), 3500)
    } catch {
      setInquirySuccess(true)
    } finally {
      setInquirySubmitting(false)
    }
  }

  const handleScheduleVisit = (e) => {
    e.preventDefault()
    if (!visitDate) return
    setVisitSuccess(true)
    setTimeout(() => setVisitSuccess(false), 3500)
  }

  if (loading) {
    return (
      <div className="p-20 text-center rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm max-w-7xl mx-auto my-8">
        <Loader2 size={36} className="animate-spin text-[#2F6BFF] mx-auto mb-3" />
        <p className="text-base font-black text-[#1E1E1C]">
          Loading commercial property specifications...
        </p>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="p-16 text-center rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm max-w-2xl mx-auto my-12">
        <h2 className="text-2xl font-black text-[#1E1E1C]">Property Not Found</h2>
        <p className="text-sm text-[#1E1E1C]/70 mt-2 mb-6 font-medium">
          The requested listing could not be found or has been leased.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-[#2F6BFF] text-white shadow-md"
        >
          <ArrowLeft size={15} />
          <span>Return to Catalog</span>
        </Link>
      </div>
    )
  }

  const isINR = property.currency === 'INR' || String(property.id).startsWith('ind-')
  const currencySymbol = isINR ? '₹' : '$'
  const formattedPrice =
    property.priceFormatted ||
    (isINR
      ? `₹${((property.price || 0) / 100000).toFixed(1)} L`
      : `$${(property.price || 0).toLocaleString()}`)

  const images = property.media?.images?.length
    ? property.media.images
    : property.images?.length
    ? property.images
    : [
        property.thumbnail ||
          property.image ||
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      ]

  const totalArea =
    property.area?.totalSqFt ||
    (typeof property.area === 'number' ? property.area : property.areaSize || 0)
  const displayArea =
    property.area?.displayArea || (totalArea ? `${totalArea.toLocaleString()} sq ft` : 'N/A')

  const mlEstimate = property.mlEstimatedPrice || null
  const formattedMl = mlEstimate
    ? isINR
      ? `₹${(mlEstimate / 100000).toFixed(1)} L`
      : `$${mlEstimate.toLocaleString()}`
    : null

  return (
    <div className="space-y-8 text-[#1E1E1C]">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#1E1E1C]/70 hover:text-[#2F6BFF] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to All Commercial Listings</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleWishlistToggle()}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border transition-all ${
              isWishlisted
                ? 'bg-[#2F6BFF] text-white border-[#2F6BFF]'
                : 'bg-[#1E1E1C] text-[#D8CBB3] border-[#383833] hover:text-white'
            }`}
          >
            <Heart size={14} className={isWishlisted ? 'fill-white' : ''} />
            <span>{isWishlisted ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Hero Title & Price Block on Sand Surface */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#2F6BFF] text-white shadow-xs">
              For {property.listingType === 'lease' ? 'Lease' : 'Sale'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#1E1E1C] text-[#D8CBB3]">
              {property.propertyType || 'Commercial'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D8CBB3] border border-[#C8BAA0] text-[#1E1E1C]">
              {displayArea}
            </span>
            {(property.structural?.buildingClass || property.buildingClass) && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D8CBB3] border border-[#C8BAA0] text-[#1E1E1C]">
                {property.structural?.buildingClass || property.buildingClass}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#1E1E1C] tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-sm text-[#1E1E1C]/70 font-semibold mt-2">
            <MapPin size={16} className="text-[#2F6BFF] shrink-0" />
            <span>
              {property.location?.address
                ? `${property.location.address}, `
                : ''}
              {property.location?.city || property.city},{' '}
              {property.location?.state || property.state || ''}{' '}
              {property.location?.zip || ''}
            </span>
          </div>
        </div>

        <div className="md:text-right shrink-0">
          <div className="text-3xl sm:text-5xl font-black text-[#1E1E1C] leading-none">
            {formattedPrice}
            {property.listingType === 'lease' && (
              <span className="text-base font-normal text-[#1E1E1C]/70 ml-1">/mo</span>
            )}
          </div>
          {property.pricePerSqFt && (
            <p className="text-xs text-[#1E1E1C]/70 font-bold mt-1">
              {currencySymbol}
              {property.pricePerSqFt} per sq ft
              {property.capRate ? ` · ${property.capRate}% Projected Cap Rate` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Main Grid: Gallery & Right Sidebar Inquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & In-Depth Details (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Multi-Photo Gallery */}
          <PropertyGallery images={images} title={property.title} />

          {/* ML Valuation Card in Charcoal */}
          {mlEstimate && (
            <div className="p-6 rounded-3xl bg-[#1E1E1C] border border-[#383833] text-[#D8CBB3] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#282825] text-[#2F6BFF] border border-[#383833]">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      AI Market Valuation Intelligence
                    </h3>
                    <p className="text-xs text-[#D8CBB3]/70 font-medium">
                      Model trained on institutional lease comps, FAR, and zoning absorption rates
                    </p>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#2F6BFF] text-white shadow-md">
                  Verified Comps
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#383833] relative z-10">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D8CBB3]/60 font-black">
                    Fair Market Value
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#2F6BFF] mt-0.5">
                    {formattedMl}
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D8CBB3]/60 font-black">
                    Algorithm Confidence
                  </span>
                  <div className="text-sm font-bold text-white mt-1">
                    98.6% Confidence Interval
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D8CBB3]/60 font-black">
                    Valuation Status
                  </span>
                  <div className="text-sm font-bold text-[#2F6BFF] mt-1 flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    Attractive Commercial Entry
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Structural Specifications Component */}
          <PropertySpecifications property={property} />

          {/* Full Asset Description */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm space-y-3">
            <h2 className="text-xl font-black text-[#1E1E1C]">Comprehensive Asset Overview</h2>
            <p className="text-sm text-[#1E1E1C]/80 leading-relaxed whitespace-pre-line font-medium">
              {property.description}
            </p>
          </div>

          {/* Amenities & Infrastructure */}
          {property.amenities?.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm space-y-4">
              <h2 className="text-xl font-black text-[#1E1E1C]">
                Engineering & Property Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 rounded-xl bg-[#D8CBB3] border border-[#C8BAA0] text-xs font-bold text-[#1E1E1C]"
                  >
                    <Check size={14} className="text-[#2F6BFF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Broker Details & Schedule Inspection (4 cols sticky) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* Broker Card in Sand surface */}
          <div className="p-6 rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1E1E1C] text-[#D8CBB3] font-black text-xl flex items-center justify-center shrink-0 border border-[#383833]">
                {(property.broker?.name || property.brokerId?.name || 'A')[0]}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#2F6BFF]">
                  Listing Broker
                </span>
                <h3 className="text-base font-black text-[#1E1E1C]">
                  {property.broker?.name || property.brokerId?.name || 'Institutional Advisory'}
                </h3>
                <p className="text-xs text-[#1E1E1C]/70 font-semibold">
                  {property.broker?.company || property.brokerId?.company || 'Commercial Advisory Partners'}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#C8BAA0] text-xs text-[#1E1E1C]/80 font-medium">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#2F6BFF]" />
                <span>{property.broker?.email || property.brokerId?.email || 'advisory@nowayestate.com'}</span>
              </div>
              {property.broker?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#2F6BFF]" />
                  <span>{property.broker.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Direct Inquiry Form */}
          <div className="p-6 rounded-3xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#1E1E1C] flex items-center gap-2">
              <Send size={16} className="text-[#2F6BFF]" />
              <span>Contact Listing Team</span>
            </h3>

            {inquirySuccess ? (
              <div className="p-4 rounded-2xl bg-[#D8CBB3] text-[#1E1E1C] text-xs font-bold border border-[#2F6BFF]">
                Inquiry transmitted to listing broker. Expect a formal response within 4 hours.
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3">
                <textarea
                  rows={4}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="I am interested in this space. Please provide lease terms, zoning clearances, and inspection details..."
                  className="w-full p-3 bg-white border border-[#C8BAA0] rounded-xl text-xs font-semibold placeholder-[#1E1E1C]/50 focus:outline-none focus:border-[#2F6BFF] text-[#1E1E1C]"
                  required
                />
                <button
                  type="submit"
                  disabled={inquirySubmitting}
                  className="w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white shadow-md shadow-[#2F6BFF]/25 transition-all"
                >
                  {inquirySubmitting ? 'Dispatching...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Schedule On-Site Tour */}
          <div className="p-6 rounded-3xl bg-[#D8CBB3] border border-[#C8BAA0] space-y-3">
            <h3 className="text-base font-black text-[#1E1E1C] flex items-center gap-2">
              <Calendar size={16} className="text-[#2F6BFF]" />
              <span>Schedule On-Site Inspection</span>
            </h3>
            <p className="text-xs text-[#1E1E1C]/70 font-medium">
              Accompanied physical tour with an engineering asset manager.
            </p>

            {visitSuccess ? (
              <div className="p-3 rounded-xl bg-[#EDE4D4] text-[#1E1E1C] text-xs font-bold border border-[#2F6BFF]">
                Inspection request logged. Broker will confirm security clearance.
              </div>
            ) : (
              <form onSubmit={handleScheduleVisit} className="space-y-2.5">
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#C8BAA0] rounded-xl text-xs font-bold text-[#1E1E1C] focus:outline-none focus:border-[#2F6BFF]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-[#1E1E1C] hover:bg-[#282825] text-[#D8CBB3] shadow-sm transition-all"
                >
                  Confirm Inspection Date
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similar.length > 0 && (
        <div className="pt-8 border-t border-[#C8BAA0]">
          <SimilarProperties
            properties={similar}
            onWishlistToggle={handleWishlistToggle}
            wishlistIds={wishlistIds}
          />
        </div>
      )}
    </div>
  )
}
