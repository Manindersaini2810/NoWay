const Footer = () => {
  return (
    <footer className="border-t border-slate-200/70 bg-white py-10 text-slate-700">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-semibold text-slate-900">© 2026 NoWay. Built for modern commercial real estate.</p>
        <div className="flex flex-wrap gap-4">
          <a href="/" className="font-medium text-slate-700 transition hover:text-slate-900">Home</a>
          <a href="/search" className="font-medium text-slate-700 transition hover:text-slate-900">Search</a>
          <a href="/add-listing" className="font-medium text-slate-700 transition hover:text-slate-900">Add Listing</a>
          <a href="/login" className="font-medium text-slate-700 transition hover:text-slate-900">Login</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
