import { Link } from 'react-router-dom'

const PropertyCard = ({ property }) => {
  const imageUrl = property.images?.[0] || property.image || 'https://via.placeholder.com/1200x800?text=Property'

  return (
    <article className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-900/50 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-t-[1.85rem]">
        <img
          src={imageUrl}
          alt={property.title}
          className="h-64 w-full bg-slate-100 object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = 'https://via.placeholder.com/1200x800?text=Property'
          }}
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
          {property.propertyType}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/10" />
      </div>

      <div className="relative p-6 transition duration-300 group-hover:bg-slate-950">
        <div className="flex items-center justify-between gap-4 text-sm text-slate-500 transition group-hover:text-slate-300">
          <span>{property.city}</span>
          <span>{property.area.toLocaleString()} sqft</span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold text-slate-900 transition group-hover:text-white">{property.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 transition group-hover:text-slate-300">{property.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xl font-semibold text-slate-900 transition group-hover:text-white">${property.price.toLocaleString()}</span>
          <Link to={`/property/${property.id}`} className="text-sm font-semibold text-slate-900 transition group-hover:text-slate-200">
            View details →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
