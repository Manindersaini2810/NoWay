import { Link } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50 py-12 text-gray-600">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Logo size="md" />
          <p className="text-xs text-gray-500 max-w-sm mt-1">
            Empowering modern commercial real estate transactions with intelligent valuation and streamlined workflows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-gray-600 transition-colors hover:text-teal-600">
            Home
          </Link>
          <Link to="/search" className="text-gray-600 transition-colors hover:text-teal-600">
            Search
          </Link>
          <Link to="/add-listing" className="text-gray-600 transition-colors hover:text-teal-600">
            Add Listing
          </Link>
          <Link to="/login" className="text-gray-600 transition-colors hover:text-teal-600">
            Login
          </Link>
        </div>
      </div>

      <div className="container mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>© 2026 NoWay Estate. All rights reserved.</p>
        <p>Commercial Real Estate Intelligence</p>
      </div>
    </footer>
  )
}

export default Footer
