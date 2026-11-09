import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Menu, X, Plus, User, LogOut } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('user')
        setUser(stored ? JSON.parse(stored) : null)
      } catch {
        setUser(null)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
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
    { name: 'Search Spaces', path: '/search' },
    ...(isBrokerOrAdmin ? [{ name: 'Post Asset', path: '/add-listing' }] : []),
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1E1E1C] text-[#D8CBB3] border-b border-[#383833] transition-all duration-300 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3.5">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links in Sand on Charcoal */}
          <nav className="hidden items-center gap-1.5 md:flex bg-[#282825] p-1.5 rounded-full border border-[#383833]">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2F6BFF] text-white shadow-sm'
                      : 'text-[#D8CBB3] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Controls with Electric Blue CTA */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                {isBrokerOrAdmin && (
                  <Link
                    to="/add-listing"
                    className="py-2 px-3.5 text-xs font-black uppercase tracking-wider rounded-xl bg-[#2F6BFF] hover:bg-[#1E55E6] text-white flex items-center gap-1.5 shadow-md shadow-[#2F6BFF]/25 transition-all"
                  >
                    <Plus size={14} />
                    <span>Post Asset</span>
                  </Link>
                )}

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#282825] border border-[#383833]">
                  <div className="h-6 w-6 rounded-full bg-[#2F6BFF] text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : <User size={12} />}
                  </div>
                  <span className="text-xs font-bold text-[#D8CBB3] max-w-[110px] truncate">
                    {user.name || user.email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-2 px-3 rounded-xl text-xs font-bold text-[#D8CBB3] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="py-2 px-4 text-xs font-bold text-[#D8CBB3] hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="py-2.5 px-5 text-xs font-black uppercase tracking-wider rounded-xl bg-[#2F6BFF] hover:bg-[#1E55E6] text-white shadow-md shadow-[#2F6BFF]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl text-[#D8CBB3] hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1E1E1C]/75 backdrop-blur-xs transition-opacity duration-300 md:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[290px] max-w-[85vw] bg-[#1E1E1C] text-[#D8CBB3] p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between border-l border-[#383833] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#383833]">
            <Logo size="sm" />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-full text-[#D8CBB3] hover:text-white hover:bg-white/5"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#2F6BFF] text-white'
                    : 'text-[#D8CBB3] hover:bg-white/5 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/search"
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#2F6BFF] text-white'
                    : 'text-[#D8CBB3] hover:bg-white/5 hover:text-white'
                }`
              }
            >
              Search Commercial Spaces
            </NavLink>
            {isBrokerOrAdmin && (
              <NavLink
                to="/add-listing"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#2F6BFF] text-white'
                      : 'text-[#D8CBB3] hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                + Post Commercial Asset
              </NavLink>
            )}
          </nav>
        </div>

        {/* Drawer Footer Auth */}
        <div className="pt-6 border-t border-[#383833]">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#282825] border border-[#383833]">
                <div className="h-10 w-10 rounded-full bg-[#2F6BFF] text-white flex items-center justify-center font-bold text-sm">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#D8CBB3] truncate">{user.name}</p>
                  <p className="text-[11px] text-[#9E9179] truncate">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <NavLink
                to="/login"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-[#D8CBB3] border border-[#383833] rounded-xl hover:bg-white/5"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 text-center text-xs font-black uppercase tracking-wider bg-[#2F6BFF] text-white rounded-xl shadow-md"
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
