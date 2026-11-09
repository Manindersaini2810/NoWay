import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import authLogo from '../assets/logo.png'
import authApi from '../services/authApi'

export default function Auth() {
  const location = useLocation()
  const navigate = useNavigate()
  const isRegister = location.pathname === '/register'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'broker',
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (isRegister && !acceptedTerms) {
      setErrorMessage('Please accept the Terms of use and Privacy Policy to register.')
      return
    }

    setIsSubmitting(true)
    try {
      if (isRegister) {
        const body = {
          name: [formData.firstName.trim(), formData.lastName.trim()].filter(Boolean).join(' ') || 'Commercial Broker',
          email: formData.email.trim(),
          password: formData.password,
          phone: formData.phone.trim(),
          role: formData.role || 'broker',
        }
        await authApi.register(body)
        setSuccessMessage('Your account was created successfully. Redirecting...')
      } else {
        await authApi.login({
          email: formData.email.trim(),
          password: formData.password,
        })
        setSuccessMessage('Welcome back. Redirecting...')
      }

      setTimeout(() => {
        navigate('/')
      }, 1200)
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          'Authentication failed. Please check credentials or ensure backend is running.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-8 text-[#1E1E1C]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1fr] items-center">
        {/* Left Branding Card (Charcoal 60% + Sand 30%) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1E1E1C] p-8 sm:p-12 text-[#D8CBB3] shadow-2xl border border-[#383833] hidden md:flex flex-col justify-between min-h-[520px]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#282825] border border-[#383833] text-xs font-bold text-[#D8CBB3] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2F6BFF]" />
              <span>Institutional Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Enterprise Commercial Real Estate Intelligence
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-[#D8CBB3]/80 leading-relaxed font-medium">
              Access real-time machine learning valuations, verified architectural and zoning data, and institutional deal flow.
            </p>
          </div>

          <div className="flex justify-center py-6">
            <div className="relative h-44 w-44 rounded-3xl border border-[#383833] bg-[#282825] p-4 shadow-2xl flex items-center justify-center">
              <img src={authLogo} alt="NoWay logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <div className="pt-4 border-t border-[#383833] flex items-center justify-between text-xs text-[#D8CBB3]/70 font-semibold">
            <span>Verified Broker Credentials</span>
            <span className="text-[#2F6BFF] font-black">NoWay Commercial</span>
          </div>
        </div>

        {/* Right Form Card on Sand Surface */}
        <div className="rounded-3xl bg-[#EDE4D4] p-8 sm:p-10 shadow-xl border border-[#C8BAA0]">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#2F6BFF]">
                {isRegister ? 'Join NoWay' : 'Sign In'}
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-[#1E1E1C]">
                {isRegister ? 'Create Broker Account' : 'Welcome Back'}
              </h2>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-[#1E1E1C] p-1.5 shadow-sm shrink-0 border border-[#383833]">
              <img src={authLogo} alt="NoWay logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-black text-[#1E1E1C]">First Name</label>
                  <input
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full rounded-xl border border-[#C8BAA0] bg-white px-3.5 py-2.5 text-xs font-bold text-[#1E1E1C] placeholder-[#1E1E1C]/40 focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-black text-[#1E1E1C]">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full rounded-xl border border-[#C8BAA0] bg-white px-3.5 py-2.5 text-xs font-bold text-[#1E1E1C] placeholder-[#1E1E1C]/40 focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-black text-[#1E1E1C]">Work Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-[#C8BAA0] bg-white px-3.5 py-2.5 text-xs font-bold text-[#1E1E1C] placeholder-[#1E1E1C]/40 focus:outline-none focus:border-[#2F6BFF]"
              />
            </div>

            {isRegister && (
              <div>
                <label className="mb-1 block text-xs font-black text-[#1E1E1C]">Direct Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-[#C8BAA0] bg-white px-3.5 py-2.5 text-xs font-bold text-[#1E1E1C] placeholder-[#1E1E1C]/40 focus:outline-none focus:border-[#2F6BFF]"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-black text-[#1E1E1C]">Password</label>
              <input
                name="password"
                type="password"
                minLength={6}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#C8BAA0] bg-white px-3.5 py-2.5 text-xs font-bold text-[#1E1E1C] placeholder-[#1E1E1C]/40 focus:outline-none focus:border-[#2F6BFF]"
              />
            </div>

            {isRegister && (
              <div className="space-y-2 text-xs text-[#1E1E1C]/80 font-medium">
                <label className="inline-flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-[#C8BAA0] text-[#2F6BFF] focus:ring-[#2F6BFF]"
                  />
                  <span>
                    I agree to the <span className="font-black text-[#1E1E1C]">Terms of Service</span> and <span className="font-black text-[#1E1E1C]">Privacy Policy</span>.
                  </span>
                </label>
              </div>
            )}

            {errorMessage && (
              <p role="alert" className="text-xs font-bold text-[#1E1E1C] bg-[#D8CBB3] p-2.5 rounded-xl border border-[#2F6BFF]">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p role="status" className="text-xs font-bold text-[#1E1E1C] bg-[#D8CBB3] p-2.5 rounded-xl border border-[#C8BAA0]">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#2F6BFF] hover:bg-[#1E55E6] px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-[#2F6BFF]/25 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-xs text-[#1E1E1C]/70 font-semibold text-center">
            {isRegister ? 'Already have an institutional account?' : 'Need a new broker account?'}{' '}
            <Link
              to={isRegister ? '/login' : '/register'}
              className="font-black text-[#2F6BFF] hover:underline"
            >
              {isRegister ? 'Sign in' : 'Register here'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
