import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container flex items-center justify-between py-3.5">
        <Logo size="md" />

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-teal-600 ${
                isActive ? 'text-teal-600 font-semibold' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-teal-600 ${
                isActive ? 'text-teal-600 font-semibold' : ''
              }`
            }
          >
            Search
          </NavLink>
          <NavLink
            to="/add-listing"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-teal-600 ${
                isActive ? 'text-teal-600 font-semibold' : ''
              }`
            }
          >
            Add Listing
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 text-sm font-medium">
          <NavLink
            to="/login"
            className="btn btn-outline py-2 px-4 text-sm"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="btn btn-primary py-2 px-4 text-sm"
          >
            Register
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Navbar
