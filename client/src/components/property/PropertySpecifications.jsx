import {
  Calendar,
  Layers,
  Maximize2,
  Shield,
  Building2,
  Compass,
  Wind,
} from 'lucide-react'

export default function PropertySpecifications({ property }) {
  if (!property) return null

  const structural = property.structural || property.specs || {}
  const hasLand = Boolean(property.landType || property.plotArea || property.roadFrontage)

  return (
    <div className="space-y-6">
      {/* Structural Table / Grid */}
      <div className="p-6 rounded-3xl bg-[#EDE4D4] border border-[#1E1E1C]/15 shadow-sm">
        <h3 className="text-base font-extrabold text-[#1E1E1C] mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-[#2F6BFF]" />
          <span>Core Structural & Engineering Metrics</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {structural.yearBuilt && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold flex items-center gap-1.5">
                <Calendar size={13} className="text-[#2F6BFF]" />
                <span>Year Built</span>
              </div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">
                {structural.yearBuilt}
              </div>
            </div>
          )}

          {structural.buildingClass && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold flex items-center gap-1.5">
                <Shield size={13} className="text-[#2F6BFF]" />
                <span>Asset Class</span>
              </div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">
                {structural.buildingClass}
              </div>
            </div>
          )}

          {structural.floors && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold flex items-center gap-1.5">
                <Layers size={13} className="text-[#2F6BFF]" />
                <span>Total Stories</span>
              </div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">
                {structural.floors} Floors
              </div>
            </div>
          )}

          {structural.ceilingHeightFt && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold flex items-center gap-1.5">
                <Maximize2 size={13} className="text-[#2F6BFF]" />
                <span>Clear Height</span>
              </div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">
                {structural.ceilingHeightFt} ft
              </div>
            </div>
          )}

          {structural.parkingSpaces && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold">Parking Spaces</div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">
                {structural.parkingSpaces} Stalls
              </div>
            </div>
          )}

          {structural.loadingDocks !== undefined && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold">Loading Docks</div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">
                {structural.loadingDocks} Doors
              </div>
            </div>
          )}

          {structural.zoning && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10 sm:col-span-2">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold flex items-center gap-1.5">
                <Compass size={13} className="text-[#2F6BFF]" />
                <span>Zoning Designation</span>
              </div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1 truncate">
                {structural.zoning}
              </div>
            </div>
          )}

          {structural.hvacType && (
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10 sm:col-span-2">
              <div className="text-xs text-[#1E1E1C]/70 font-semibold flex items-center gap-1.5">
                <Wind size={13} className="text-[#2F6BFF]" />
                <span>HVAC & Air Filtration</span>
              </div>
              <div className="text-sm font-extrabold text-[#1E1E1C] mt-1 truncate">
                {structural.hvacType}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Land Specifications if applicable */}
      {hasLand && (
        <div className="p-6 rounded-3xl bg-[#EDE4D4] border border-[#1E1E1C]/15 shadow-sm">
          <h3 className="text-base font-extrabold text-[#1E1E1C] mb-4 flex items-center gap-2">
            <Compass size={18} className="text-[#2F6BFF]" />
            <span>Land Parcel & Topography Attributes</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {property.plotArea && (
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
                <div className="text-xs text-[#1E1E1C]/70 font-semibold">Plot Area</div>
                <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">{property.plotArea}</div>
              </div>
            )}
            {property.landType && (
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
                <div className="text-xs text-[#1E1E1C]/70 font-semibold">Land Type</div>
                <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">{property.landType}</div>
              </div>
            )}
            {property.roadFrontage && (
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
                <div className="text-xs text-[#1E1E1C]/70 font-semibold">Road Frontage</div>
                <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">{property.roadFrontage}</div>
              </div>
            )}
            {property.roadWidth && (
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#1E1E1C]/10">
                <div className="text-xs text-[#1E1E1C]/70 font-semibold">Road Width</div>
                <div className="text-sm font-extrabold text-[#1E1E1C] mt-1">{property.roadWidth}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
