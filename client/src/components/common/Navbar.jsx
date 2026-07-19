import { NavLink } from 'react-router-dom'
import brandLogo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900">
          <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
            <img src={brandLogo} alt="NoWay logo" className="h-full w-full object-contain p-2" />
          </span>
          <div className="leading-tight">
            <span className="block text-base font-semibold text-slate-900">NoWay</span>
            <span className="block text-xs text-slate-500">Commercial listings</span>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-slate-900' : 'hover:text-slate-900')}>
            Home
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => (isActive ? 'text-slate-900' : 'hover:text-slate-900')}>
            Search
          </NavLink>
          <NavLink to="/add-listing" className={({ isActive }) => (isActive ? 'text-slate-900' : 'hover:text-slate-900')}>
            Add Listing
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <NavLink
            to="/login"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-900 transition duration-300 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm hover:shadow-slate-200/50"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-300/10"
          >
            Register
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Navbar
