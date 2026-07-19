import { useParams, Link } from 'react-router-dom'
import mockProperties from '../data/mockProperties'

const PropertyDetail = () => {
  const { id } = useParams()
  const property = mockProperties.find((item) => item.id === Number(id))

  if (!property) {
    return (
      <div className="surface-card rounded-[1.75rem] p-10 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Property not found</h1>
        <p className="mt-2 text-slate-600">The listing you requested does not exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="surface-card rounded-[1.75rem] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Property detail</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{property.title}</h1>
            <p className="mt-3 text-slate-600">{property.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">{property.propertyType}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{property.city}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{property.buildingClass}</span>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-slate-900 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Asking price</p>
            <p className="mt-2 text-3xl font-semibold">${property.price.toLocaleString()}</p>
            <p className="mt-2 text-slate-400">{property.area.toLocaleString()} sqft • {property.city}</p>
            <Link to="/search" className="mt-6 inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Back to search
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <img src={property.images[0]} alt={property.title} className="h-80 w-full rounded-[1.5rem] object-cover shadow-sm" />
          <div className="grid gap-4 sm:grid-cols-2">
            {property.images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`${property.title} ${index + 2}`} className="h-48 w-full rounded-[1.5rem] object-cover shadow-sm" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card rounded-[1.5rem] p-6">
            <h2 className="text-xl font-semibold text-slate-900">Structural specs</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full text-sm text-left text-slate-600">
                <tbody>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 font-medium text-slate-900">Year built</th>
                    <td className="px-4 py-3">{property.specs.yearBuilt}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 font-medium text-slate-900">Floors</th>
                    <td className="px-4 py-3">{property.specs.floors}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 font-medium text-slate-900">Ceiling height</th>
                    <td className="px-4 py-3">{property.specs.ceilingHeight}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 font-medium text-slate-900">Parking</th>
                    <td className="px-4 py-3">{property.specs.parking}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 font-medium text-slate-900">Zoning</th>
                    <td className="px-4 py-3">{property.specs.zoning}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-900">Occupancy status</th>
                    <td className="px-4 py-3">{property.specs.occupancy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-[1.5rem] p-6">
              <h3 className="font-semibold text-slate-900">Map goes here</h3>
              <p className="mt-2 text-sm text-slate-600">This placeholder will be connected to a map provider later.</p>
            </div>
            <div className="surface-card rounded-[1.5rem] p-6">
              <h3 className="font-semibold text-slate-900">Estimated Market Value</h3>
              <p className="mt-2 text-sm text-slate-600">This placeholder will display a future valuation model.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
