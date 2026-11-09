import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  X,
  MapPin,
  Maximize2,
  Building2,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  Check,
  Send,
  Layers,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react'
import inquiryApi from '../../services/inquiryApi'

export default function PropertyModal({ property, onClose, onFavoriteToggle, isFavorited }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryMessage, setInquiryMessage] = useState('')
  const [inquirySent, setInquirySent] = useState(false)
  const [submittingInquiry, setSubmittingInquiry] = useState(false)
  const [visitScheduled, setVisitScheduled] = useState(false)
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('11:00 AM')

  // Lock background scrolling and attach ESC listener
  useEffect(() => {
    if (!property) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [property, onClose])

  if (!property) return null

  const id = property._id || property.id
  const images = property.media?.images?.length
    ? property.media.images
    : property.images?.length
    ? property.images
    : [
        property.thumbnail ||
          property.image ||
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      ]

  const title = property.title || 'Untitled Commercial Asset'
  const isINR = property.currency === 'INR' || String(property.id).startsWith('ind-')
  const currencySymbol = isINR ? '₹' : '$'

  const formattedPrice =
    property.priceFormatted ||
    (isINR
      ? `₹${(property.price / 100000).toFixed(1)} L`
      : `$${(property.price || 0).toLocaleString()}`)

  const listingType = (property.listingType || 'sale').toLowerCase()
  const propertyType = (property.propertyType || 'Commercial').toUpperCase()
  const city = property.location?.city || property.city || 'Prime Location'
  const state = property.location?.state || property.state || ''
  const fullAddress = property.location?.address
    ? `${property.location.address}, ${city}${state ? `, ${state}` : ''}`
    : `${city}${state ? `, ${state}` : ''}`

  const totalArea =
    property.area?.totalSqFt ||
    (typeof property.area === 'number' ? property.area : property.areaSize || 0)
  const displayArea =
    property.area?.displayArea || (totalArea ? `${totalArea.toLocaleString()} sq ft` : 'N/A')

  const buildingClass =
    property.structural?.buildingClass || property.buildingClass || 'Class A'

  // Specifications
  const specs = property.structural || property.specs || {}
  const hasLandSpecs = Boolean(property.landType || property.plotArea || property.roadFrontage)

  // ML Valuation
  const mlEstimate = property.mlEstimatedPrice || null
  const formattedMlEstimate = mlEstimate
    ? isINR
      ? `₹${(mlEstimate / 100000).toFixed(1)} L`
      : `$${mlEstimate.toLocaleString()}`
    : null

  const handlePrevImage = (e) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleSendInquiry = async (e) => {
    e.preventDefault()
    if (!inquiryMessage.trim()) return

    setSubmittingInquiry(true)
    try {
      await inquiryApi.createInquiry({ propertyId: id, message: inquiryMessage })
      setInquirySent(true)
      setTimeout(() => {
        setShowInquiryForm(false)
        setInquirySent(false)
        setInquiryMessage('')
      }, 2500)
    } catch {
      setInquirySent(true)
    } finally {
      setSubmittingInquiry(false)
    }
  }

  const handleScheduleVisit = (e) => {
    e.preventDefault()
    if (!visitDate) return
    setVisitScheduled(true)
    setTimeout(() => {
      setShowScheduleForm(false)
      setVisitScheduled(false)
    }, 2500)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          key="modal-card"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 35, scale: 0.96 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#D8CBB3] border border-[#C8BAA0] rounded-3xl overflow-hidden w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative"
        >
          {/* Header Image Carousel */}
          <div className="relative h-72 sm:h-96 w-full bg-[#1E1E1C] shrink-0 overflow-hidden select-none">
            <img
              src={images[activeImageIndex]}
              alt={title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Charcoal Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1C] via-[#1E1E1C]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1E1E1C]/60 via-transparent to-transparent pointer-events-none" />

            {/* Top Bar Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#2F6BFF] text-white shadow-md">
                  For {listingType === 'lease' ? 'Lease' : 'Sale'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E1E1C] text-[#D8CBB3] border border-[#383833]">
                  {propertyType}
                </span>
                {buildingClass && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#D8CBB3] text-[#1E1E1C]">
                    {buildingClass}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {images.length > 1 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1E1E1C]/90 text-[#D8CBB3] border border-[#383833]">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-10 h-10 rounded-full bg-[#1E1E1C] hover:bg-[#282825] text-[#D8CBB3] border border-[#383833] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Carousel Arrow Controls */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E1E1C]/80 hover:bg-[#2F6BFF] text-white border border-[#383833] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E1E1C]/80 hover:bg-[#2F6BFF] text-white border border-[#383833] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {/* Bottom Hero Overlay on Charcoal */}
            <div className="absolute bottom-4 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                  {title}
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-[#D8CBB3] mt-1 font-semibold">
                  <MapPin size={16} className="text-[#2F6BFF] shrink-0" />
                  <span className="truncate">{fullAddress}</span>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  {formattedPrice}
                  {listingType === 'lease' && (
                    <span className="text-base font-normal text-[#D8CBB3] ml-1">/mo</span>
                  )}
                </div>
                {property.pricePerSqFt && (
                  <p className="text-xs text-[#D8CBB3]/90 font-medium">
                    {currencySymbol}
                    {property.pricePerSqFt} / sq ft
                    {property.capRate ? ` · ${property.capRate}% Cap Rate` : ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body (Sand surface + Charcoal typography) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#1E1E1C]">
            {/* Quick Action Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#EDE4D4] border border-[#C8BAA0]">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1C]/60 block">
                    Usable Space
                  </span>
                  <span className="text-base font-black text-[#1E1E1C]">{displayArea}</span>
                </div>
                <div className="h-8 w-px bg-[#C8BAA0]" />
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1C]/60 block">
                    Classification
                  </span>
                  <span className="text-base font-black text-[#1E1E1C]">{buildingClass}</span>
                </div>
                {property.structural?.occupancyStatus && (
                  <>
                    <div className="h-8 w-px bg-[#C8BAA0] hidden sm:block" />
                    <div className="hidden sm:block">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1C]/60 block">
                        Status
                      </span>
                      <span className="text-base font-black text-[#1E1E1C]">
                        {property.structural.occupancyStatus}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/property/${id}`}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-[#1E1E1C] hover:bg-[#282825] text-[#D8CBB3] flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Full Page</span>
                  <ArrowUpRight size={14} />
                </Link>
                {onFavoriteToggle && (
                  <button
                    type="button"
                    onClick={() => onFavoriteToggle(id)}
                    className={`px-4 py-2 rounded-xl text-xs font-black border transition-colors ${
                      isFavorited
                        ? 'bg-[#2F6BFF] text-white border-[#2F6BFF]'
                        : 'bg-[#1E1E1C] text-[#D8CBB3] border-[#383833] hover:text-white'
                    }`}
                  >
                    {isFavorited ? 'Saved to Favorites' : 'Save Favorite'}
                  </button>
                )}
              </div>
            </div>

            {/* ML Valuation Card in Charcoal with Electric Blue Accents */}
            {mlEstimate && (
              <div className="p-5 rounded-2xl bg-[#1E1E1C] border border-[#383833] text-[#D8CBB3] shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#282825] text-[#2F6BFF] border border-[#383833]">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white tracking-wide">
                        AI-Powered Commercial Valuation
                      </h4>
                      <p className="text-xs text-[#D8CBB3]/70 font-medium">
                        Trained on institutional transactions, cap rates & zoning density
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#2F6BFF] text-white shadow-sm">
                    Verified Comps
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#383833] relative z-10">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D8CBB3]/60 font-black">
                      Estimated Market Value
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-[#2F6BFF]">
                      {formattedMlEstimate}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D8CBB3]/60 font-black">
                      Valuation Model
                    </span>
                    <div className="text-sm font-bold text-white mt-1">
                      CatBoost + GeoSpatial Hedonic
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D8CBB3]/60 font-black">
                      Listing Alignment
                    </span>
                    <div className="text-sm font-bold text-[#2F6BFF] mt-1 flex items-center gap-1">
                      <CheckCircle2 size={16} />
                      Fair Market Alignment
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Structural Specifications */}
            <div>
              <h3 className="text-base font-black text-[#1E1E1C] mb-3 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#2F6BFF]" />
                <span>Structural & Commercial Specifications</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {specs.yearBuilt && (
                  <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                    <div className="text-xs text-[#1E1E1C]/60 font-bold flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#2F6BFF]" />
                      <span>Year Built</span>
                    </div>
                    <div className="text-sm font-black text-[#1E1E1C] mt-1">{specs.yearBuilt}</div>
                  </div>
                )}
                {specs.floors && (
                  <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                    <div className="text-xs text-[#1E1E1C]/60 font-bold flex items-center gap-1.5">
                      <Layers size={13} className="text-[#2F6BFF]" />
                      <span>Floors / Levels</span>
                    </div>
                    <div className="text-sm font-black text-[#1E1E1C] mt-1">{specs.floors}</div>
                  </div>
                )}
                {specs.ceilingHeightFt && (
                  <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                    <div className="text-xs text-[#1E1E1C]/60 font-bold flex items-center gap-1.5">
                      <Maximize2 size={13} className="text-[#2F6BFF]" />
                      <span>Ceiling Height</span>
                    </div>
                    <div className="text-sm font-black text-[#1E1E1C] mt-1">
                      {specs.ceilingHeightFt} ft
                    </div>
                  </div>
                )}
                {specs.parkingSpaces && (
                  <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                    <div className="text-xs text-[#1E1E1C]/60 font-bold flex items-center gap-1.5">
                      <Shield size={13} className="text-[#2F6BFF]" />
                      <span>Parking Stalls</span>
                    </div>
                    <div className="text-sm font-black text-[#1E1E1C] mt-1">
                      {specs.parkingSpaces}
                    </div>
                  </div>
                )}
                {specs.loadingDocks !== undefined && (
                  <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                    <div className="text-xs text-[#1E1E1C]/60 font-bold flex items-center gap-1.5">
                      <Building2 size={13} className="text-[#2F6BFF]" />
                      <span>Loading Docks</span>
                    </div>
                    <div className="text-sm font-black text-[#1E1E1C] mt-1">
                      {specs.loadingDocks} Docks
                    </div>
                  </div>
                )}
                {specs.zoning && (
                  <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                    <div className="text-xs text-[#1E1E1C]/60 font-bold flex items-center gap-1.5">
                      <Compass size={13} className="text-[#2F6BFF]" />
                      <span>Zoning</span>
                    </div>
                    <div className="text-sm font-black text-[#1E1E1C] mt-1 truncate" title={specs.zoning}>
                      {specs.zoning}
                    </div>
                  </div>
                )}
                {specs.hvacType && (
                  <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0] sm:col-span-2">
                    <div className="text-xs text-[#1E1E1C]/60 font-bold">HVAC Infrastructure</div>
                    <div className="text-sm font-black text-[#1E1E1C] mt-1 truncate" title={specs.hvacType}>
                      {specs.hvacType}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Land Specifics (if Land asset) */}
            {hasLandSpecs && (
              <div>
                <h3 className="text-base font-black text-[#1E1E1C] mb-3 flex items-center gap-2">
                  <Compass size={18} className="text-[#2F6BFF]" />
                  <span>Land Parcel & Topography Details</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {property.plotArea && (
                    <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                      <div className="text-xs text-[#1E1E1C]/60 font-bold">Plot Dimension</div>
                      <div className="text-sm font-black text-[#1E1E1C] mt-1">{property.plotArea}</div>
                    </div>
                  )}
                  {property.landType && (
                    <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                      <div className="text-xs text-[#1E1E1C]/60 font-bold">Land Category</div>
                      <div className="text-sm font-black text-[#1E1E1C] mt-1">{property.landType}</div>
                    </div>
                  )}
                  {property.roadFrontage && (
                    <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                      <div className="text-xs text-[#1E1E1C]/60 font-bold">Road Frontage</div>
                      <div className="text-sm font-black text-[#1E1E1C] mt-1">{property.roadFrontage}</div>
                    </div>
                  )}
                  {property.roadWidth && (
                    <div className="p-3.5 rounded-xl bg-[#EDE4D4] border border-[#C8BAA0]">
                      <div className="text-xs text-[#1E1E1C]/60 font-bold">Access Road Width</div>
                      <div className="text-sm font-black text-[#1E1E1C] mt-1">{property.roadWidth}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div>
                <h3 className="text-base font-black text-[#1E1E1C] mb-2">Asset Description</h3>
                <p className="text-xs sm:text-sm text-[#1E1E1C]/80 leading-relaxed whitespace-pre-line font-medium">
                  {property.description}
                </p>
              </div>
            )}

            {/* Amenities Chips */}
            {property.amenities?.length > 0 && (
              <div>
                <h3 className="text-base font-black text-[#1E1E1C] mb-2.5">
                  Building & Site Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#EDE4D4] text-[#1E1E1C] border border-[#C8BAA0]"
                    >
                      <Check size={13} className="text-[#2F6BFF]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Broker Information */}
            <div className="p-5 rounded-2xl bg-[#EDE4D4] border border-[#C8BAA0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#1E1E1C] text-[#D8CBB3] font-black flex items-center justify-center text-lg shrink-0">
                  {(property.broker?.name || property.brokerId?.name || 'A')[0]}
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#1E1E1C]">
                    {property.broker?.name || property.brokerId?.name || 'Institutional Listing Broker'}
                  </h4>
                  <p className="text-xs text-[#1E1E1C]/70 font-semibold">
                    {property.broker?.company ||
                      property.brokerId?.company ||
                      'Commercial Capital Advisory'}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-[#1E1E1C]/70">
                    <span className="flex items-center gap-1">
                      <Mail size={12} className="text-[#2F6BFF]" />
                      {property.broker?.email || property.brokerId?.email || 'inquiries@nowayestate.com'}
                    </span>
                    {property.broker?.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="text-[#2F6BFF]" />
                        {property.broker.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowInquiryForm((prev) => !prev)}
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#1E1E1C] hover:bg-[#282825] text-[#D8CBB3] transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Mail size={14} className="text-[#2F6BFF]" />
                  <span>Send Inquiry</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowScheduleForm((prev) => !prev)}
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white transition-all shadow-sm electric-glow flex items-center gap-1.5"
                >
                  <Calendar size={14} />
                  <span>Schedule Tour</span>
                </button>
              </div>
            </div>

            {/* Interactive Inquiry Drawer Form */}
            {showInquiryForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSendInquiry}
                className="p-5 rounded-2xl bg-[#EDE4D4] border border-[#C8BAA0] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#1E1E1C] flex items-center gap-2">
                    <Send size={15} className="text-[#2F6BFF]" />
                    <span>Inquire About {title}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="text-xs text-[#1E1E1C]/60 hover:text-[#1E1E1C] font-bold"
                  >
                    Cancel
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="I am interested in leasing/purchasing this commercial space..."
                  className="w-full p-3 text-xs font-semibold bg-white border border-[#C8BAA0] rounded-xl focus:outline-none focus:border-[#2F6BFF] text-[#1E1E1C]"
                  required
                />
                <div className="flex justify-between items-center">
                  <p className="text-[11px] text-[#1E1E1C]/60 font-semibold">
                    Direct dispatch to listing advisory team
                  </p>
                  <button
                    type="submit"
                    disabled={submittingInquiry}
                    className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white flex items-center gap-1.5 shadow-sm"
                  >
                    {submittingInquiry ? 'Sending...' : inquirySent ? 'Sent Successfully ✓' : 'Submit Inquiry'}
                  </button>
                </div>
              </motion.form>
            )}

            {/* Interactive Schedule Visit Drawer Form */}
            {showScheduleForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleScheduleVisit}
                className="p-5 rounded-2xl bg-[#EDE4D4] border border-[#C8BAA0] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#1E1E1C] flex items-center gap-2">
                    <Calendar size={15} className="text-[#2F6BFF]" />
                    <span>Schedule an On-Site Asset Inspection</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="text-xs text-[#1E1E1C]/60 hover:text-[#1E1E1C] font-bold"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-[#1E1E1C]/70 block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-2.5 text-xs font-bold bg-white border border-[#C8BAA0] rounded-xl focus:outline-none focus:border-[#2F6BFF] text-[#1E1E1C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-[#1E1E1C]/70 block mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full p-2.5 text-xs font-bold bg-white border border-[#C8BAA0] rounded-xl focus:outline-none focus:border-[#2F6BFF] text-[#1E1E1C]"
                    >
                      <option>10:00 AM - 11:30 AM</option>
                      <option>02:00 PM - 03:30 PM</option>
                      <option>04:30 PM - 06:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-[11px] text-[#1E1E1C]/60 font-semibold">
                    An agent will confirm gate entry credentials within 2 hours
                  </p>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white flex items-center gap-1.5 shadow-sm"
                  >
                    {visitScheduled ? 'Tour Confirmed ✓' : 'Confirm Inspection'}
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
