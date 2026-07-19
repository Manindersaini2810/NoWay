import { Link } from 'react-router-dom'
import PropertyCard from '../components/property/PropertyCard'
import mockProperties from '../data/mockProperties'

const Home = () => {
  const featured = mockProperties.slice(0, 3)

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[2rem] bg-slate-50 px-6 py-16 shadow-sm sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
              NoWay minimal listings
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
              Your next commercial space, made simple.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Modern commercial property listings.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/search" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-4 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-200/40">
                Explore listings
              </Link>
              <Link to="/add-listing" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md hover:shadow-slate-200/60">
                Add your listing
              </Link>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {['340+ clients helped', '500+ homes available', '24/7 support'].map((item) => (
                <div key={item} className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-3xl font-semibold text-slate-900">{item.split(' ')[0]}</p>
                  <p className="mt-2 text-sm text-slate-500">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] bg-white p-6 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
              alt="Modern property"
              className="h-[520px] w-full rounded-[1.75rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 rounded-3xl bg-white/95 p-5 shadow-md ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Featured home</p>
              <p className="mt-2 text-base font-semibold text-slate-900">Modern office campus near downtown.</p>
              <p className="mt-3 text-sm text-slate-600">Explore the space and discover what makes it ideal for your business.</p>
              <Link to="/search" className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900 hover:text-slate-700">
                Check it out →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured listings</p>
            <h2 className="text-4xl font-semibold text-slate-900">Based on your location</h2>
          </div>
          <Link to="/search" className="text-sm font-semibold text-slate-900 hover:text-slate-700">
            View all homes →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-50 p-10 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Testimonials</p>
          <h2 className="mt-2 text-4xl font-semibold text-slate-900">Everything starts with built trust.</h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {['Excellent service', 'Fast response', 'Quality listings'].map((summary) => (
            <div key={summary} className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-semibold text-slate-900">“</p>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Client number 1</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Clear, fast, trusted support.
              </p>
              <div className="mt-5 flex gap-1 text-slate-900">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
