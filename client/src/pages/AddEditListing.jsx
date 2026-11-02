import { useState } from 'react'
import {
  HiOutlineOfficeBuilding,
  HiOutlineUpload,
  HiX,
  HiCheck,
} from 'react-icons/hi'
import Stepper from '../components/common/Stepper'

const AddEditListing = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    listingType: 'sale',
    price: '',
    city: '',
    state: '',
    address: '',
    zip: '',
    propertyType: 'office',
    buildingClass: 'Class A',
    area: '',
    lotSqFt: '',
    description: '',
    yearBuilt: '',
    floors: '',
    ceilingHeightFt: '',
    parking: '',
    loadingDocks: '',
    hvacType: 'Central',
    zoning: 'Commercial',
    occupancyStatus: 'Vacant',
    photos: '',
  })

  const [previewImages, setPreviewImages] = useState([
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  ])

  const steps = [
    { title: 'Basic Info' },
    { title: 'Structural' },
    { title: 'Location' },
    { title: 'Media' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPhotoUrl = (url) => {
    if (!url.trim()) return
    setPreviewImages((prev) => [...prev, url.trim()])
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos ? `${prev.photos}, ${url.trim()}` : url.trim(),
    }))
  }

  const handleRemovePhoto = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Capture locally for now
    console.log('Commercial listing data ready for backend:', formData)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedSuccess(true)
    }, 600)
  }

  const propertyTypes = [
    { label: 'Office', value: 'office' },
    { label: 'Retail', value: 'retail' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Industrial', value: 'industrial' },
    { label: 'Land', value: 'land' },
    { label: 'Mixed-use', value: 'mixed-use' },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      {/* High-Contrast Header Banner with Teal Accent */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-8 sm:p-10 shadow-xl border border-slate-800">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 border border-teal-500/30 backdrop-blur-md mb-3">
            <HiOutlineOfficeBuilding className="h-4 w-4 text-teal-400" />
            <span>Broker & Asset Listing Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Create or Edit{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              Commercial Listing
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Provide property attributes, financial parameters, structural data, and imagery for comprehensive marketplace valuation.
          </p>
        </div>
      </div>

      {/* Stepper Progress */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(stepIndex) => setCurrentStep(stepIndex)}
        />
      </div>

      {/* Success Banner */}
      {submittedSuccess && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex items-center justify-between text-emerald-900 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              <HiCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Listing Captured Successfully!</p>
              <p className="text-xs text-emerald-700">
                Data logged and prepared for backend synchronization.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmittedSuccess(false)}
            className="text-xs font-bold underline text-emerald-800 hover:text-emerald-950"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Multi-Step Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 0: Basic Info */}
        {currentStep === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 fade-in">
            <div className="flex items-center pb-4 border-b border-gray-100">
              <div className="w-1.5 h-6 bg-teal-600 rounded-full mr-3" />
              <h2 className="text-lg font-bold text-gray-900">
                1. Basic Commercial Details
              </h2>
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {[
                  { label: 'For Sale', value: 'sale' },
                  { label: 'For Lease', value: 'lease' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, listingType: item.value }))
                    }
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                      formData.listingType === item.value
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Category Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Property Category
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, propertyType: type.value }))
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      formData.propertyType === type.value
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500 hover:bg-teal-50/30'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Price */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Listing Title *
                </label>
                <input
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Harbor Point Logistics Center"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Asking Price ($ USD) *
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 2850000"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Area & Building Class */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Total Floor Area (Sq Ft) *
                </label>
                <input
                  name="area"
                  type="number"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. 18500"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Building Class
                </label>
                <select
                  name="buildingClass"
                  value={formData.buildingClass}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs cursor-pointer"
                >
                  <option value="Class A">Class A (Prime modern spec)</option>
                  <option value="Class B">Class B (Well maintained)</option>
                  <option value="Class C">Class C (Functional / Value-add)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Executive Summary / Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Highlight key tenant amenities, clear heights, transit connectivity, or investment yield..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
              />
            </div>
          </div>
        )}

        {/* STEP 1: Structural Details */}
        {currentStep === 1 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 fade-in">
            <div className="flex items-center pb-4 border-b border-gray-100">
              <div className="w-1.5 h-6 bg-teal-600 rounded-full mr-3" />
              <h2 className="text-lg font-bold text-gray-900">
                2. Structural & Engineering Specifications
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Year Built
                </label>
                <input
                  name="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  placeholder="e.g. 2021"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Total Stories / Floors
                </label>
                <input
                  name="floors"
                  type="number"
                  value={formData.floors}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Ceiling Height (Ft)
                </label>
                <input
                  name="ceilingHeightFt"
                  type="number"
                  value={formData.ceilingHeightFt}
                  onChange={handleChange}
                  placeholder="e.g. 18"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Parking Spaces
                </label>
                <input
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  placeholder="e.g. 150 covered"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Loading Docks
                </label>
                <input
                  name="loadingDocks"
                  type="number"
                  value={formData.loadingDocks}
                  onChange={handleChange}
                  placeholder="e.g. 6 dock-high"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Occupancy Status
                </label>
                <select
                  name="occupancyStatus"
                  value={formData.occupancyStatus}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs cursor-pointer"
                >
                  <option value="Vacant">Vacant</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Zoning Classification
                </label>
                <input
                  name="zoning"
                  value={formData.zoning}
                  onChange={handleChange}
                  placeholder="e.g. C-3 Commercial / Mixed Use"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  HVAC Infrastructure
                </label>
                <input
                  name="hvacType"
                  value={formData.hvacType}
                  onChange={handleChange}
                  placeholder="e.g. Central Multi-zone Variable"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Location */}
        {currentStep === 2 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 fade-in">
            <div className="flex items-center pb-4 border-b border-gray-100">
              <div className="w-1.5 h-6 bg-teal-600 rounded-full mr-3" />
              <h2 className="text-lg font-bold text-gray-900">
                3. Geographic & Address Information
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Street Address *
              </label>
              <input
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 400 Pine Street, Suite 1200"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  City *
                </label>
                <input
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Seattle"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  State / Province *
                </label>
                <input
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. WA"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  ZIP / Postal Code
                </label>
                <input
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="e.g. 98101"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Photos & Media */}
        {currentStep === 3 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 fade-in">
            <div className="flex items-center pb-4 border-b border-gray-100">
              <div className="w-1.5 h-6 bg-teal-600 rounded-full mr-3" />
              <h2 className="text-lg font-bold text-gray-900">
                4. High-Resolution Visual Assets
              </h2>
            </div>

            {/* Drag and Drop Box */}
            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center bg-gray-50/60 hover:border-teal-600 transition-colors">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-3 border border-teal-100">
                <HiOutlineUpload className="h-7 w-7" />
              </div>
              <p className="text-sm font-bold text-gray-900">
                Add property photos or paste image URLs
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Upload up to 10 images (JPEG, PNG, WebP up to 8MB each)
              </p>

              {/* URL Input */}
              <div className="mt-5 flex max-w-md mx-auto gap-2">
                <input
                  id="newPhotoInput"
                  type="url"
                  placeholder="Paste image URL here..."
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-teal-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddPhotoUrl(e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('newPhotoInput')
                    if (input && input.value) {
                      handleAddPhotoUrl(input.value)
                      input.value = ''
                    }
                  }}
                  className="btn btn-primary py-2 px-4 text-xs font-bold rounded-xl"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Thumbnail Previews */}
            {previewImages.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Gallery Previews ({previewImages.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previewImages.map((src, index) => (
                    <div
                      key={index}
                      className="group relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-2xs"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <HiX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step Navigation Bar */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className="btn btn-outline py-2.5 px-6 text-xs font-bold rounded-xl disabled:opacity-40"
          >
            ← Previous Step
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() =>
                setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
              }
              className="btn btn-primary py-2.5 px-7 text-xs font-bold rounded-xl shadow-md"
            >
              Continue to {steps[currentStep + 1]?.title} →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary py-2.5 px-8 text-xs font-bold rounded-xl shadow-lg hover:shadow-teal-600/30 flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Publishing Listing...</span>
              ) : (
                <>
                  <HiCheck className="h-4 w-4" />
                  <span>Publish Commercial Listing</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddEditListing
