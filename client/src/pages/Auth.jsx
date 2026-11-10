import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import authLogo from '../assets/logo.png'
import { useAuth } from '../context/useAuth'
import PasswordInput from '../components/auth/PasswordInput'
import PasswordStrength from '../components/auth/PasswordStrength'
import GoogleSignIn from '../components/auth/GoogleSignIn'
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function Auth() {
  const location = useLocation()
  const navigate = useNavigate()
  const isRegister = location.pathname === '/register'

  const { login, register, googleSignIn } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    role: 'broker',
  })

  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Confirm password must match the original password.')
        return
      }
      if (!acceptedTerms) {
        setErrorMessage('Please accept the Terms of Service & Privacy Policy to register.')
        return
      }
    }

    setIsSubmitting(true)

    try {
      if (isRegister) {
        const body = {
          name: formData.name.trim() || 'Commercial Investor',
          email: formData.email.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          role: formData.role || 'broker',
        }

        const res = await register(body)
        setSuccessMessage('Registration initiated! Redirecting to email verification...')
        setTimeout(() => {
          navigate('/verify-email', { state: { email: res.email || formData.email.trim() } })
        }, 800)
      } else {
        const res = await login({
          email: formData.email.trim(),
          password: formData.password,
        })

        if (res.requires2FA) {
          setSuccessMessage('Credentials verified. Redirecting to two-step verification...')
          setTimeout(() => {
            navigate('/verify-otp', {
              state: {
                tempToken: res.tempToken,
                email: res.email || formData.email.trim(),
                from: location.state?.from,
              },
            })
          }, 600)
        } else if (res.requiresEmailVerification) {
          setTimeout(() => {
            navigate('/verify-email', { state: { email: res.email || formData.email.trim() } })
          }, 600)
        } else {
          setSuccessMessage('Login successful! Redirecting to marketplace...')
          const destination = location.state?.from?.pathname || '/'
          setTimeout(() => {
            navigate(destination)
          }, 800)
        }
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Authentication failed. Please verify credentials.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSuccess = async (credential, role) => {
    setErrorMessage('')
    setIsSubmitting(true)
    try {
      const res = await googleSignIn(credential, role)
      if (res.requires2FA) {
        navigate('/verify-otp', {
          state: {
            tempToken: res.tempToken,
            email: res.email,
            from: location.state?.from,
          },
        })
      } else {
        const destination = location.state?.from?.pathname || '/'
        navigate(destination)
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Google authentication failed.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-8 text-[#1E1E1C]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.1fr] items-center">
        {/* Left Branding Card (Charcoal 60% + Sand 30%) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1E1E1C] p-8 sm:p-12 text-[#D8CBB3] shadow-2xl border border-[#383833] hidden md:flex flex-col justify-between min-h-[560px]">
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
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#2F6BFF]" />
              Two-Factor Protected
            </span>
            <span className="text-[#2F6BFF] font-black">NoWay Security</span>
          </div>
        </div>

        {/* Right Form Card (Sand 30% Surface) */}
        <div className="rounded-3xl bg-[#EDE4D4] p-6 sm:p-10 shadow-xl border border-[#1E1E1C]/15">
          {/* Auth Tab Switcher */}
          <div className="flex rounded-2xl bg-white/60 p-1.5 border border-[#1E1E1C]/10 mb-6">
            <Link
              to="/login"
              className={`flex-1 py-2.5 text-center text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                !isRegister
                  ? 'bg-[#1E1E1C] text-[#D8CBB3] shadow-md'
                  : 'text-[#1E1E1C]/60 hover:text-[#1E1E1C]'
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`flex-1 py-2.5 text-center text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                isRegister
                  ? 'bg-[#1E1E1C] text-[#D8CBB3] shadow-md'
                  : 'text-[#1E1E1C]/60 hover:text-[#1E1E1C]'
              }`}
            >
              Create Account
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1C] tracking-tight">
              {isRegister ? 'Join Institutional Marketplace' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-[#1E1E1C]/70 mt-1">
              {isRegister
                ? 'Create your verified account for commercial acquisitions, leasing, and listings.'
                : 'Enter your credentials to access your commercial asset portfolio.'}
            </p>
          </div>

          {/* Error & Success Messages */}
          {errorMessage && (
            <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-bold text-rose-800">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-2xl bg-[#1E1E1C] border border-[#2F6BFF]/40 p-3.5 text-xs font-bold text-[#D8CBB3] flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#2F6BFF]" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Google Sign In */}
          <div className="mb-6">
            <GoogleSignIn
              onSuccess={handleGoogleSuccess}
              onError={(err) => setErrorMessage(err.message)}
              role={formData.role}
            />

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1E1E1C]/15" />
              </div>
              <span className="relative bg-[#EDE4D4] px-4 text-[11px] font-black uppercase tracking-wider text-[#1E1E1C]/50">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
                    Account Classification
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'buyer', label: 'Investor / Occupier' },
                      { value: 'broker', label: 'Commercial Broker' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, role: type.value }))}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formData.role === type.value
                            ? 'bg-[#1E1E1C] text-[#D8CBB3] border-[#1E1E1C] shadow-sm'
                            : 'bg-white/80 text-[#1E1E1C] border-[#1E1E1C]/15 hover:bg-white'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full rounded-xl border border-[#1E1E1C]/20 bg-white/90 px-4 py-3 text-sm font-medium text-[#1E1E1C] placeholder:text-[#1E1E1C]/40 outline-none transition-all focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-[#1E1E1C]/20 bg-white/90 px-4 py-3 text-sm font-medium text-[#1E1E1C] placeholder:text-[#1E1E1C]/40 outline-none transition-all focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
                      Firm / Organization
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Brookfield Partners"
                      className="w-full rounded-xl border border-[#1E1E1C]/20 bg-white/90 px-4 py-3 text-sm font-medium text-[#1E1E1C] placeholder:text-[#1E1E1C]/40 outline-none transition-all focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/20"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
                Work Email Address *
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-[#1E1E1C]/20 bg-white/90 px-4 py-3 text-sm font-medium text-[#1E1E1C] placeholder:text-[#1E1E1C]/40 outline-none transition-all focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70">
                  Password *
                </label>
                {!isRegister && (
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-[#2F6BFF] hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isRegister ? 'Min 8 characters with symbol & number' : 'Enter your password'}
              />
              {isRegister && <PasswordStrength password={formData.password} />}
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
                  Confirm Password *
                </label>
                <PasswordInput
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password to confirm"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-[11px] font-bold text-rose-600">
                    Passwords do not match
                  </p>
                )}
              </div>
            )}

            {isRegister && (
              <label className="flex items-start gap-2.5 text-xs text-[#1E1E1C]/75 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-[#1E1E1C]/30 text-[#2F6BFF] focus:ring-[#2F6BFF]"
                />
                <span>
                  I accept the institutional Terms of Use, Broker Standard Disclosures, and Privacy Policy.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={isSubmitting || (isRegister && !acceptedTerms)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] hover:bg-[#1E55E6] text-white py-3.5 px-6 text-xs font-black uppercase tracking-wider shadow-md shadow-[#2F6BFF]/25 disabled:opacity-50 cursor-pointer transition-all mt-4"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{isRegister ? 'Register & Send Verification' : 'Authenticate & Continue'}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
