import { useMemo, useState } from 'react'
import FilterPanel from '../components/filters/FilterPanel'
import PropertyCard from '../components/property/PropertyCard'
import mockProperties from '../data/mockProperties'

const ITEMS_PER_PAGE = 4

const Search = () => {
  const [filters, setFilters] = useState({
    propertyTypes: [],
    maxPrice: 3500000,
    maxArea: 35000,
    city: 'All',
    buildingClass: 'All'
  })
  const [page, setPage] = useState(1)

  const propertyTypes = ['Office', 'Retail', 'Warehouse', 'Industrial']

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      const matchesType = filters.propertyTypes.length === 0 || filters.propertyTypes.includes(property.propertyType)
      const matchesPrice = property.price <= filters.maxPrice
      const matchesArea = property.area <= filters.maxArea
      const matchesCity = filters.city === 'All' || property.city === filters.city
      const matchesClass = filters.buildingClass === 'All' || property.buildingClass === filters.buildingClass

      return matchesType && matchesPrice && matchesArea && matchesCity && matchesClass
    })
  }, [filters])

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const pagedProperties = filteredProperties.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="rounded-4xl bg-slate-50 px-6 py-8 shadow-sm sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Search listings</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Find the right commercial space</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Filter listings quickly.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <FilterPanel filters={filters} setFilters={setFilters} propertyTypes={propertyTypes} />

        <div>
          <div className="mb-6 flex flex-col gap-3 rounded-[1.75rem] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Showing {filteredProperties.length} properties</p>
              <p className="mt-1 text-sm text-slate-500">Filter by key details.</p>
            </div>
            <button
              onClick={() => {
                setFilters({
                  propertyTypes: [],
                  maxPrice: 3500000,
                  maxArea: 35000,
                  city: 'All',
                  buildingClass: 'All'
                })
                setPage(1)
              }}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Reset filters
            </button>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {pagedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              No properties match these filters yet.
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-slate-500">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
