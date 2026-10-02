import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import authLogo from '../assets/logo.png'

const Auth = () => {
  const location = useLocation()
  const isRegister = location.pathname === '/register'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
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
      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '')
      const endpoint = isRegister ? 'register' : 'login'
      const body = isRegister
        ? {
            name: [formData.firstName.trim(), formData.lastName.trim()].filter(Boolean).join(' '),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.phone.trim()
          }
        : { email: formData.email.trim(), password: formData.password }
      const response = await fetch(`${apiUrl}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Authentication failed. Please try again.')
      }

      localStorage.setItem('accessToken', result.data.accessToken)
      if (result.data.refreshToken) {
        localStorage.setItem('refreshToken', result.data.refreshToken)
      }
      localStorage.setItem('user', JSON.stringify(result.data.user))
      setSuccessMessage(isRegister ? 'Your account was created successfully.' : 'You are now logged in.')
    } catch (error) {
      setErrorMessage(
        error instanceof TypeError
          ? 'Could not reach the API. Make sure the backend is running and VITE_API_URL points to it.'
          : error.message
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-4xl bg-slate-950 p-8 text-white shadow-2xl">
          <div className="max-w-lg">
            <p className="text-sm  tracking-[0.5em] text-gray-200">NoWay</p>
            {/* <h1 className="mt-6 text-5xl font-semibold leading-tight text-white sm:text-6xl">Design with us</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">Access thousands of design resources and templates.</p> */}
          </div>

          <div className="mt-12 flex justify-center px-4 sm:px-0">
            <div className="relative h-115 w-full max-w-115 overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl">
              <img src={authLogo} alt="NoWay logo" className="h-full w-full object-contain" />
              <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full border border-white/10 bg-white/5 blur-xl" />
              <div className="pointer-events-none absolute right-8 bottom-12 h-16 w-16 rounded-full border border-white/10 bg-white/5 opacity-80" />
            </div>
          </div>
        </div>

        <div className="rounded-4xl bg-white p-8 shadow-xl ring-1 ring-slate-200 sm:p-10">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{isRegister ? 'Sign up now' : 'Log in'}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">{isRegister ? 'Create your account' : 'Welcome back'}</h2>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900">
              <img src={authLogo} alt="NoWay" className="h-8 w-8 object-contain" />
            </div>
          </div>

          <p className="mt-2 text-sm text-slate-500">{isRegister ? 'Join with a simple form.' : 'Enter your account details.'}</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
                  <input
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
              />
            </div>

            {isRegister && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                name="password"
                type="password"
                minLength={8}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
              />
            </div>

            {isRegister && (
              <div className="space-y-3 text-sm text-slate-600">
                <label className="inline-flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900"
                  />
                  <span>I agree to the <span className="font-semibold text-slate-900">Terms of use</span> and <span className="font-semibold text-slate-900">Privacy Policy</span>.</span>
                </label>
                <label className="inline-flex items-start gap-3">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900" />
                  <span>I consent to receive SMS and email updates.</span>
                </label>
              </div>
            )}

            {errorMessage && <p role="alert" className="text-sm font-medium text-red-600">{errorMessage}</p>}
            {successMessage && <p role="status" className="text-sm font-medium text-emerald-700">{successMessage}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-slate-900 px-4 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? 'Please wait…' : isRegister ? 'Sign up' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            {isRegister ? 'Already have an account?' : 'Need a new account?'}{' '}
            <Link to={isRegister ? '/login' : '/register'} className="font-semibold text-slate-900">
              {isRegister ? 'Login instead' : 'Register now'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth
