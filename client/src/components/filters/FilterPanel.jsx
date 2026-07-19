const FilterPanel = ({ filters, setFilters, propertyTypes }) => {
  const handleCheckboxChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((item) => item !== type)
        : [...prev.propertyTypes, type]
    }))
  }

  return (
    <aside className="surface-card rounded-[1.5rem] p-6">
      <h2 className="text-lg font-semibold text-slate-900">Filter listings</h2>
      <p className="mt-1 text-sm text-slate-500">Refine the results by property type, price, size, and location.</p>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Property type</h3>
          <div className="mt-3 space-y-2">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={filters.propertyTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Price range</h3>
          <input
            type="range"
            min="500000"
            max="3500000"
            step="50000"
            value={filters.maxPrice}
            onChange={(event) => setFilters((prev) => ({ ...prev, maxPrice: Number(event.target.value) }))}
            className="mt-3 w-full accent-blue-600"
          />
          <p className="mt-2 text-sm text-slate-500">Up to ${filters.maxPrice.toLocaleString()}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Area range</h3>
          <input
            type="range"
            min="5000"
            max="35000"
            step="1000"
            value={filters.maxArea}
            onChange={(event) => setFilters((prev) => ({ ...prev, maxArea: Number(event.target.value) }))}
            className="mt-3 w-full accent-blue-600"
          />
          <p className="mt-2 text-sm text-slate-500">Up to {filters.maxArea.toLocaleString()} sqft</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">City</h3>
          <select
            value={filters.city}
            onChange={(event) => setFilters((prev) => ({ ...prev, city: event.target.value }))}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            <option value="All">All cities</option>
            <option value="Seattle">Seattle</option>
            <option value="Austin">Austin</option>
            <option value="Denver">Denver</option>
            <option value="Phoenix">Phoenix</option>
            <option value="Chicago">Chicago</option>
            <option value="Miami">Miami</option>
            <option value="Atlanta">Atlanta</option>
            <option value="Dallas">Dallas</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Building class</h3>
          <select
            value={filters.buildingClass}
            onChange={(event) => setFilters((prev) => ({ ...prev, buildingClass: event.target.value }))}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            <option value="All">All classes</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
        </div>
      </div>
    </aside>
  )
}

export default FilterPanel
