import { useState } from 'react'

const AddEditListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: '',
    propertyType: 'Office',
    buildingClass: 'Class A',
    area: '',
    description: '',
    yearBuilt: '',
    floors: '',
    parking: '',
    photos: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Listing data:', formData)
    alert('Listing form submitted. Check the browser console for the data.')
  }

  return (
    <div className="mx-auto max-w-4xl rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Add or edit listing</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create a commercial property listing</h1>
        <p className="mt-3 text-slate-600">This form is ready for future backend integration. For now it captures the data locally and logs it to the console.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Basic info</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Listing title" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
            <input name="price" value={formData.price} onChange={handleChange} placeholder="Asking price" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
            <input name="area" value={formData.area} onChange={handleChange} placeholder="Area in sqft" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700">
              <option value="Office">Office</option>
              <option value="Retail">Retail</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Industrial">Industrial</option>
            </select>
            <select name="buildingClass" value={formData.buildingClass} onChange={handleChange} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700">
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
              <option value="Class C">Class C</option>
            </select>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Structural details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} placeholder="Year built" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
            <input name="floors" value={formData.floors} onChange={handleChange} placeholder="Number of floors" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
            <input name="parking" value={formData.parking} onChange={handleChange} placeholder="Parking details" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Location and photos</h2>
          <div className="mt-4 space-y-4">
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Short description" rows="4" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
            <input name="photos" value={formData.photos} onChange={handleChange} placeholder="Photo URLs (comma separated)" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
          </div>
        </section>

        <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800">
          Save listing
        </button>
      </form>
    </div>
  )
}

export default AddEditListing
