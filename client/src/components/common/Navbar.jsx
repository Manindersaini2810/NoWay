import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { HiOutlineMenuAlt3, HiX, HiOutlinePlusSm, HiOutlineUser } from 'react-icons/hi'
import Logo from './Logo'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      setUser(null)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
    setDrawerOpen(false)
    navigate('/login')
  }

  const isBrokerOrAdmin = user && (user.role === 'broker' || user.role === 'admin')

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    ...(isBrokerOrAdmin ? [{ name: 'Add Listing', path: '/add-listing' }] : []),
  ]

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/85 backdrop-blur-md transition-all duration-300 hover:shadow-sm">
        <div className="container flex items-center justify-between py-3">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links with Hover Pill Effects */}
          <nav className="hidden items-center gap-1 md:flex bg-gray-100/60 p-1.5 rounded-full border border-gray-200/60 backdrop-blur-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-teal-700 bg-white shadow-xs font-bold'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-white/70 hover:scale-[1.02]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth / User Controls */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                {isBrokerOrAdmin && (
                  <Link
                    to="/add-listing"
                    className="btn btn-primary py-2 px-3.5 text-xs font-bold flex items-center gap-1.5 rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-teal-600/30"
                  >
                    <HiOutlinePlusSm className="h-4 w-4" />
                    <span>Post Property</span>
                  </Link>
                )}

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="h-7 w-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : <HiOutlineUser />}
                  </div>
                  <span className="text-xs font-bold text-gray-800 max-w-[110px] truncate">
                    {user.name || user.email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline py-2 px-3.5 text-xs font-semibold rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline py-2 px-4 text-sm font-semibold rounded-xl hover:border-teal-600 hover:text-teal-600 hover:bg-teal-50/60 transition-all hover:-translate-y-0.5"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-primary py-2 px-5 text-sm font-semibold rounded-xl shadow-md shadow-teal-600/20 hover:-translate-y-0.5 hover:shadow-teal-600/35 transition-all"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-2.5 rounded-xl text-gray-700 hover:text-teal-600 hover:bg-teal-50/80 active:scale-95 transition-all"
              aria-label="Open mobile menu"
            >
              <HiOutlineMenuAlt3 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header with Logo and Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <Logo size="sm" />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/search"
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                }`
              }
            >
              Search Listings
            </NavLink>
            {isBrokerOrAdmin && (
              <NavLink
                to="/add-listing"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 font-bold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                  }`
                }
              >
                + Add Listing
              </NavLink>
            )}
          </nav>
        </div>

        {/* Drawer Footer Auth Section */}
        <div className="pt-6 border-t border-gray-100">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline w-full py-2.5 rounded-xl text-sm font-semibold text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <NavLink
                to="/login"
                onClick={() => setDrawerOpen(false)}
                className="btn btn-outline w-full py-2.5 text-center font-semibold rounded-xl"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setDrawerOpen(false)}
                className="btn btn-primary w-full py-2.5 text-center font-semibold rounded-xl shadow-md"
              >
                Create Account
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
