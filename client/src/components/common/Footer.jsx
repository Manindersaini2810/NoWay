import { Link } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200/80 bg-white py-10 text-gray-600">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Logo size="md" />
          <p className="text-xs text-gray-500 max-w-sm mt-1">
            Empowering modern commercial real estate transactions with intelligent valuation and streamlined workflows.
          </p>
        </div>

        {/* Right side: only Add Listing badge */}
        <div className="flex items-center">
          <Link
            to="/add-listing"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-600 text-white shadow-sm hover:bg-teal-700 hover:shadow-teal-600/30 transition-all hover:scale-105"
          >
            <HiOutlinePlusSm className="h-4 w-4" />
            <span>Add Listing</span>
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
